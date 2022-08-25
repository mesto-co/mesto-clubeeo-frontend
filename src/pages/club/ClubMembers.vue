<template>
  <club-page
    header='members'
    sticky='bottom'
  >
    <template v-slot:buttons>
      <q-tab-panels
        v-model='activeTab'
        animated
        class='q-pa-none q-ma-none bg-transparent'
      >

        <q-tab-panel
          name='init'
          class='q-pa-none q-ma-none bg-transparent'
        >
          <q-btn
            no-caps flat
            :class='{clubButton: true, clubButtonActive: selectedMembers.length > 0, clubButtonDisable: selectedMembers.length === 0}'
            :disable='selectedMembers.length === 0'
            @click='onMakeAnOffer'
          >batch send</q-btn>
        </q-tab-panel>

        <q-tab-panel
          name='message'
          class='q-pa-none q-ma-none bg-transparent'
        >
          <club-button
            class='q-mx-md buttonSecondary'
            icon='fa-solid fa-angle-left'
            @click='activeTab = "init"'
          >back</club-button>

          <q-btn
            no-caps flat
            :class='{clubButton: true, clubButtonActive: message.length > 0, clubButtonDisable: message.length === 0}'
            :disable='message.length === 0'
            @click='onSendMessageClick'
          >send message</q-btn>
        </q-tab-panel>
      </q-tab-panels>
    </template>

    <q-tab-panels
      v-model='activeTab'
      animated
      class='q-pa-none q-ma-none bg-transparent'
    >

      <q-tab-panel
        name='init'
        class='q-pa-none q-ma-none bg-transparent'
      >

        <members-table
          :rows='usersView'
          selection='multiple'
          v-model:selected='selectedMembers'
        />

      </q-tab-panel>

      <q-tab-panel
        name='message'
        class='q-pa-none q-ma-none bg-transparent'
      >

        <div>
          send message
        </div>

        <q-editor
          dark outlined
          style='width: 100%; background-color: transparent'
          v-model='message'
          :toolbar="[
            ['bold', 'italic', 'underline', 'strike'],
          ]"
        />

        <div class='q-pt-lg'>to</div>

        <members-table
          :rows='selectedMembers'
        />

      </q-tab-panel>

    </q-tab-panels>

  </club-page>
</template>

<script lang='ts'>
import { defaultPagination } from 'src/lib/components/table';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useRoute } from 'vue-router';
import { shortenAddress } from 'src/lib/components/chains';
import MembersTable from 'components/members/MembersTable.vue';
import { Notify } from 'quasar';
import ClubButton from 'components/clubpage/ClubButton.vue';
import ClubPage from 'components/clublayout/ClubPage.vue';

interface IFetchedUser {
  id: number
  screenName: string
  imgUrl: string
  wallets: {
    id: number
    address: string
    chain: string
    chainNorm: string
  }[]
  rolesInClub: {
    id: number
    clubRole: {
      name: string
    }
    clubRoleToken: {
      clubRole: {
        name: string
      }
    }
  }[]
}

interface IFetchedClub {
  id: number
  name: string
}

const columns = [
  { name: 'screenName', align: 'left', label: 'name', field: (u: IFetchedUser) => u.screenName || `id${u.id}` },
  { name: 'roles', align: 'left', label: 'roles', field: 'rolesView' },
  { name: 'wallets', align: 'right', label: 'wallet', field: 'wallets' }
];

export default defineComponent({
  components: { ClubPage, ClubButton, MembersTable },
  setup() {
    const $route = useRoute();

    const users = ref<IFetchedUser[]>([]);
    const club = ref<Partial<IFetchedClub>>({});
    const slug = computed(() => $route.params.clubSlug ? String($route.params.clubSlug) : null);

    onMounted(async () => {
      if (!slug.value) return;

      const result = await api.post<{
        data: {
          club: {
            id: number
            name: string
            users: IFetchedUser[]
          }
        }
      }>('/graphql', {
        query: `{
          club(slug:"${slug.value}") {
            id
            name
            users {
              id
              screenName
              imgUrl
              wallets {
                id
                address
                chain
                chainNorm
              }
              rolesInClub(slug:"${slug.value}") {
                id
                clubRole {
                  name
                }
                clubRoleToken {
                  clubRole {
                    name
                  }
                }
              }
            }
            # userClubRoles {
            #   id
            #   user {
            #     id
            #     screenName
            #     imgUrl
            #   }
            #   clubRoleToken {
            #     id
            #     tokenContract {
            #       id
            #       address
            #       chain
            #       standard
            #     }
            #     clubRole {
            #       id
            #       name
            #     }
            #   }
            # }
          }
        }`
      });

      const clubData = result.data.data.club;

      users.value = clubData.users;
      club.value = {id: clubData.id, name: clubData.name};
    });

    const usersView = computed(() => {
      return users.value.map((user: IFetchedUser) => {
        const roleNames = new Set<string>();
        return {
          ...user,
          rolesView: user.rolesInClub
            .map(role => {
              return {
                name: role.clubRole?.name || role.clubRoleToken?.clubRole?.name || 'unknown'
              };
            })
            .filter(role => roleNames.has(role.name) ? false : (roleNames.add(role.name) && true))
        };
      });
    });

    const selectedMembers = ref<IFetchedUser[]>([]);

    const message = ref('');

    const activeTab = ref('init');

    const onMakeAnOffer = () => {
      activeTab.value = 'message';
    };

    const onSendMessageClick = async () => {
      const memberIds = selectedMembers.value.map(m => m.id);

      if (!club.value.id) return console.error('Club ID is not set');

      const result = await api.post<{ok: boolean}>(`/api/club/${club.value.id}/apps/membersManager/batchSendMessages`, {
        userIds: memberIds,
        message: message.value,
      });

      if (result.data.ok) {
        Notify.create({
          message: 'messages are sent to users',
          type: 'Positive',
          classes: 'clubButtonActive'
        });

        activeTab.value = 'init';
        message.value = '';
      }
    }

    return {
      activeTab,
      usersView,
      selectedMembers,
      message,
      columns,
      defaultPagination,
      shortenAddress,
      onMakeAnOffer,
      onSendMessageClick,
    };
  }
});
</script>
