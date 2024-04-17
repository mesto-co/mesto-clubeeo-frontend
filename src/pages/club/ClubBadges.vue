<template>
  <club-page
    header='badges'
    sticky='bottom'
  >
    <template v-slot:buttons>
      <div v-if='club && club.meInClub && club.meInClub.isAdmin'>
        <club-button
          class='clubButtonActive q-px-md q-mr-sm'
          dense
          @click='addDialog = true'
        >add badge</club-button>
      </div>
    </template>

    <q-table
      :columns='columns'
      :rows='badges'
      row-key='id'
      hide-bottom
      dark flat
      style='background-color: rgb(29 29 39);'
      :pagination='defaultPagination'
    >

      <template v-slot:body-cell-name='props'>
        <q-td :props='props'>
          <q-chip
            dense
            square
            size='12px'
            :class='{[props.row.class]: true}'
          >{{ props.row.name }}</q-chip>
        </q-td>
      </template>

    </q-table>

  </club-page>

  <q-dialog v-model="addDialog">
    <q-card dark class='dialog-width'>
      <q-card-section>
        <div class="text-h6">new badge</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          label='title'
          dark outlined
          class='q-mb-md'
          v-model='badgeName'
        />

        <q-select
          label='type'
          dark outlined
          class='q-mb-md'
          v-model='badgeType'
          :options='badgeOptions'
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
<!--              <q-item-section avatar>-->
<!--                <q-icon :name="scope.opt.icon" />-->
<!--              </q-item-section>-->
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.caption }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-uploader
          flat
          url='/api/uploads/image'
          class='q-mb-lg full-width clubBgDefault'
          label='Upload image'
          auto-upload
          @uploaded='onImgUploaded'
        />
      </q-card-section>

      <q-card-actions align="right">
        <club-button
          class='clubButton'
          v-close-popup
        >
          cancel
        </club-button>

        <club-button
          class='clubButtonActive'
          v-close-popup
          @click='createBadge'
        >
          add
        </club-button>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script lang='ts'>
import ClubPage from '../../components/clublayout/ClubPage.vue';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { shortenAddress } from 'src/lib/components/chains';
import { defaultPagination } from 'src/lib/components/table';
import { api } from 'boot/axios';
import { useRoute } from 'vue-router';
import { IMeInClub, meInClubPartial } from 'src/models/meInClub';
import ClubButton from 'components/clubpage/ClubButton.vue';
import { Notify } from 'quasar';
import slugify from 'slugify';
import { imgUploaded } from 'src/lib/onImageUpload';

const columns = [
  { name: 'name', align: 'left', label: 'name', field: 'name' },
  { name: 'badgeType', align: 'left', label: 'badge type', field: 'badgeType' },
  { name: 'members', align: 'right', label: 'members', field: 'membersCount' },
];

export enum BadgeType {
  basic = 'basic',
  score = 'score', // has value (points) attached
}

interface IClubBadge {
  id: number
  slug: string
  img: string
  badgeType: BadgeType
  title: string
  membersCount: number
}

interface ILoadedClub {
  id: number
  name: string
  badges: IClubBadge[],
  meInClub: IMeInClub,
}

interface IBadgeTypeOption {
  label: string,
  value: string,
  caption: string
}

export default defineComponent({
  components: { ClubButton, ClubPage },
  setup() {
    const $route = useRoute();

    const badges = ref<IClubBadge[]>([]);
    const club = ref<ILoadedClub | null>(null);
    const slug = computed(() => $route.params.clubSlug ? String($route.params.clubSlug) : null);

    const load = async () => {
      if (!slug.value) return console.error('no club slug');

      const result = await api.post<{
        data: {
          club: {
            id: number
            name: string
            badges: IClubBadge[],
            meInClub: IMeInClub,
          }
        }
      }>('/graphql', {
        query: `{
          club(slug:"${slug.value}") {
            id
            name
            badges {
              id
              name
              slug
              img
              badgeType
              membersCount
            }
            meInClub ${meInClubPartial}
          }
        }`
      });

      club.value = result.data.data.club;
      badges.value = result.data.data.club.badges;
    }

    onMounted(async () => {
      await load();
    });

    const addDialog = ref(false);
    const badgeName = ref('');

    const createBadge = async () => {
      if (!club.value?.id) return console.error('no club ID');

      const result = await api.post<{
        data: {
          createBadge: {
            isCreated: boolean
          }
        }
      }>('/graphql', {
        query: `mutation createBadge($clubId:ID!, $badgeName:String!, $badgeType:String!, $slug:String!, $img:String!) {
          createBadge(clubId:$clubId, badgeName:$badgeName, badgeType:$badgeType, slug:$slug, img:$img) {
            isCreated
          }
        }`,
        variables: {
          clubId: club.value.id,
          badgeName: badgeName.value,
          badgeType: badgeType.value.value,
          slug: slugify(badgeName.value),
          img: img.value,
        }
      });

      const badgeNameVal = badgeName.value;
      const isCreated = result.data.data.createBadge.isCreated;

      Notify.create({
        type: isCreated ? 'positive' : 'warning',
        message: isCreated ? `badge "${badgeNameVal}" is created` : `badge "${badgeNameVal}" already exists`
      });

      badgeName.value = '';

      if (isCreated) {
        await load();
      }
    }

    const badgeOptions: Array<IBadgeTypeOption> = [
      { label: 'basic', value: 'basic', caption: 'simple badge or achievement' },
      { label: 'score', value: 'score', caption: 'score points' },
    ];

    const badgeType = ref<IBadgeTypeOption>(badgeOptions[0]);

    const img = ref<string>('');
    const onImgUploaded = imgUploaded((path) => img.value = path);

    return {
      club,
      badges,
      addDialog,
      badgeName,
      badgeType,
      badgeOptions,
      columns,
      defaultPagination,
      createBadge,
      onImgUploaded,
      shortenAddress,
    };
  }
})
</script>
