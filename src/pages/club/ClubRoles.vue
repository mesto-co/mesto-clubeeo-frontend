<template>
  <club-page header="roles" sticky="bottom">
    <template v-slot:buttons>
      <div v-if="club && club.meInClub && club.meInClub.isAdmin">
        <club-button
          class="clubButtonActive q-px-md q-mr-sm"
          dense
          @click="addDialog = true"
          >add role</club-button
        >
      </div>
    </template>

    <q-table
      :columns="columns"
      :rows="roles"
      row-key="id"
      hide-bottom
      dark
      flat
      style="background-color: rgb(29 29 39)"
      :pagination="defaultPagination"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <q-chip
            dense
            square
            size="12px"
            :class="{ [props.row.class]: true }"
            >{{ props.row.name }}</q-chip
          >
        </q-td>
      </template>
    </q-table>
  </club-page>

  <q-dialog v-model="addDialog">
    <q-card dark class="dialog-width">
      <q-card-section>
        <div class="text-h6">new role</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input label="role name" dark outlined v-model="roleName" />
      </q-card-section>

      <q-card-actions align="right">
        <club-button class="clubButton" v-close-popup> cancel </club-button>

        <club-button class="clubButtonActive" v-close-popup @click="createRole">
          add
        </club-button>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import ClubPage from '../../components/clublayout/ClubPage.vue';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { shortenAddress } from '@src/lib/components/chains';
import { defaultPagination } from '@src/lib/components/table';
import { api } from 'boot/axios';
import { useRoute } from 'vue-router';
import { IMeInClub, meInClubPartial } from '@src/models/meInClub';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { Notify } from 'quasar';

const columns = [
  { name: 'name', align: 'left', label: 'role name', field: 'name' },
  { name: 'members', align: 'right', label: 'members', field: 'membersCount' },
];

interface IClubRole {
  name: string;
  membersCount: number;
}

interface ILoadedClub {
  id: number;
  name: string;
  roles: IClubRole[];
  meInClub: IMeInClub;
}

export default defineComponent({
  components: { ClubButton, ClubPage },
  setup() {
    const $route = useRoute();

    const roles = ref<IClubRole[]>([]);
    const club = ref<ILoadedClub | null>(null);
    const slug = computed(() =>
      $route.params.clubSlug ? String($route.params.clubSlug) : null
    );

    const load = async () => {
      if (!slug.value) return console.error('no club slug');

      const result = await api.post<{
        data: {
          club: {
            id: number;
            name: string;
            roles: IClubRole[];
            meInClub: IMeInClub;
          };
        };
      }>('/graphql', {
        query: `{
          club(slug:"${slug.value}") {
            id
            name
            roles {
              id
              name
              membersCount
            }
            meInClub ${meInClubPartial}
          }
        }`,
      });

      club.value = result.data.data.club;
      roles.value = result.data.data.club.roles;
    };

    onMounted(async () => {
      await load();
    });

    const addDialog = ref(false);
    const roleName = ref('');

    const createRole = async () => {
      if (!club.value?.id) return console.error('no club ID');

      const result = await api.post<{
        data: {
          createRole: {
            isCreated: boolean;
          };
        };
      }>('/graphql', {
        query: `mutation createRole($clubId:ID!, $roleName:String!) {
          createRole(clubId:$clubId, roleName:$roleName) {
            isCreated
          }
        }`,
        variables: {
          clubId: club.value.id,
          roleName: roleName.value,
        },
      });

      const roleNameVal = roleName.value;
      const isCreated = result.data.data.createRole.isCreated;

      Notify.create({
        type: isCreated ? 'positive' : 'warning',
        message: isCreated
          ? `role "${roleNameVal}" is created`
          : `role "${roleNameVal}" already exists`,
      });

      roleName.value = '';

      if (isCreated) {
        await load();
      }
    };

    return {
      club,
      roles,
      addDialog,
      roleName,
      columns,
      defaultPagination,
      createRole,
      shortenAddress,
    };
  },
});
</script>
