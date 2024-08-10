<template>
  <club-page header="members" sticky="bottom">
    <template v-slot:buttons>
      <q-tab-panels
        v-model="activeTab"
        animated
        class="q-pa-none q-ma-none bg-transparent"
      >
        <q-tab-panel name="init" class="q-pa-none q-ma-none bg-transparent">
          <!--          <q-btn-->
          <!--            no-caps flat-->
          <!--            :class='{clubButton: true, clubButtonActive: true, "q-mr-sm": true}'-->
          <!--            :disable='isPremium'-->
          <!--            @click='onExportCSV'-->
          <!--          >export CSV</q-btn>-->

          <q-btn
            no-caps
            flat
            :class="{
              clubButton: true,
              clubButtonActive: selectedMembers.length > 0,
              clubButtonDisable: selectedMembers.length === 0,
            }"
            :disable="!isPremium || selectedMembers.length === 0"
            @click="onMakeAnOffer"
            >batch send</q-btn
          >
        </q-tab-panel>

        <q-tab-panel name="message" class="q-pa-none q-ma-none bg-transparent">
          <club-button
            class="q-mx-md buttonSecondary"
            icon="fa-solid fa-angle-left"
            @click="activeTab = 'init'"
            >back
          </club-button>

          <q-btn
            no-caps
            flat
            :class="{
              clubButton: true,
              clubButtonActive: message.length > 0,
              clubButtonDisable: message.length === 0,
            }"
            :disable="message.length === 0"
            @click="onSendMessageClick"
            >send message
          </q-btn>
        </q-tab-panel>
      </q-tab-panels>
    </template>

    <q-tab-panels
      v-model="activeTab"
      animated
      class="q-pa-none q-ma-none bg-transparent"
    >
      <q-tab-panel name="init" class="q-pa-none q-ma-none bg-transparent">
        <div class="row q-col-gutter-md">
          <div class="col">
            <q-input
              label="name"
              dark
              outlined
              dense
              v-model="searchNameText"
              class="q-pb-md"
              @keypress="onSearchNameClick"
            >
              <template v-slot:append>
                <q-icon
                  v-if="searchNameText !== ''"
                  name="close"
                  @click="searchNameText = ''"
                  class="cursor-pointer"
                />
                <q-icon name="search" @click="onSearchNameClick" />
              </template>
            </q-input>
          </div>

          <div class="col"></div>

          <div class="col">
            <q-input
              label="wallet"
              dark
              outlined
              dense
              v-model="searchWalletText"
              class="q-pb-md"
              @keypress="onSearchWalletClick"
            >
              <template v-slot:append>
                <q-icon
                  v-if="searchWalletText !== ''"
                  name="close"
                  @click="searchWalletText = ''"
                  class="cursor-pointer"
                />
                <q-icon name="search" @click="onSearchWalletClick" />
              </template>
            </q-input>
          </div>
        </div>

        <members-table
          :shorten-address="!isPremium"
          :columns="columns"
          :rows="usersView"
          :hide-bottom="false"
          :loading="isLoading"
          selection="multiple"
          v-model:pagination="pagination"
          v-model:selected="selectedMembers"
          @request="onRequest"
        >
          <template v-slot:body-cell-buttons="props">
            <q-td :props="props">
              <club-button
                :to="{
                  name: 'club-member',
                  params: { memberId: props.row.member.id },
                }"
                dense
                size="sm"
                class="q-mr-xs"
                icon="fa-solid fa-gear"
              >
                <q-tooltip>member page</q-tooltip>
              </club-button>
            </q-td>
          </template>
        </members-table>
      </q-tab-panel>

      <q-tab-panel name="message" class="q-pa-none q-ma-none bg-transparent">
        <div>send message</div>

        <q-editor
          dark
          outlined
          style="width: 100%; background-color: transparent"
          v-model="message"
          :toolbar="[['bold', 'italic', 'underline', 'strike']]"
        />

        <div class="q-pt-lg">to</div>

        <members-table :rows="selectedMembers" />
      </q-tab-panel>
    </q-tab-panels>
  </club-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useRoute } from 'vue-router';
import { shortenAddress } from '@src/lib/components/chains';
import MembersTable from '@components/members/MembersTable.vue';
import { Notify } from 'quasar';
import ClubButton from '@components/clubpage/ClubButton.vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { gqlErrorNotification } from '@src/lib/notifications';
import { TGQLErrors } from '@src/lib/gqlInterfaces';
import { IPagination } from '@src/lib/components/table';
import { useMeInClubStore } from '@stores/meInClubStore';

interface IFetchedUser {
  id: number;
  screenName: string;
  imgUrl: string;
  wallets: {
    id: number;
    address: string;
    chain: string;
    chainNorm: string;
  }[];
  userExts: {
    id: number;
    service: string;
    extId: string;
    getAccount: {
      link: string;
      name: string;
    };
  }[];
  memberInClub: {
    id: number;
  };
  rolesInClub: {
    id: number;
    clubRole: {
      name: string;
    };
    clubRoleToken: {
      clubRole: {
        name: string;
      };
    };
  }[];
}

interface IFetchedClub {
  id: number;
  name: string;
}

export default defineComponent({
  components: { ClubPage, ClubButton, MembersTable },
  setup() {
    const $route = useRoute();

    const users = ref<IFetchedUser[]>([]);
    const club = ref<Partial<IFetchedClub>>({});
    const slug = computed(() =>
      $route.params.clubSlug ? String($route.params.clubSlug) : null
    );
    const searchWalletText = ref('');
    const searchNameText = ref('');
    const pagination = ref<IPagination>({
      page: 1,
      rowsNumber: 0,
      rowsPerPage: 50,
    });
    const isLoading = ref(false);

    const load = async () => {
      if (!slug.value) return;

      try {
        isLoading.value = true;
        const result = await api.post<{
          data: {
            club: {
              id: number;
              name: string;
              users: {
                count: number;
                items: IFetchedUser[];
              };
            };
          };
          errors?: TGQLErrors;
        }>('/graphql', {
          query: `{
            club(slug:"${slug.value}") {
              id
              name
              users(
                searchWallet:"${searchWalletText.value}",
                searchName:"${searchNameText.value}",
                page:${pagination.value.page},
                take:${pagination.value.rowsPerPage},
              ) {
                count
                items {
                  id
                  screenName
                  imgUrl
                  memberInClub(slug:"${slug.value}") {
                    id
                  }
                  wallets {
                    id
                    address
                    chain
                    chainNorm
                  }
                  userExts {
                    id
                    service
                    extId
                    getAccount {
                      link
                      name
                    }
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
              }
            }
          }`,
        });

        if (result.data.errors) {
          return gqlErrorNotification(result.data.errors);
        }

        const clubData = result.data.data.club;
        users.value = clubData.users.items;
        pagination.value.rowsNumber = clubData.users.count;

        club.value = { id: clubData.id, name: clubData.name };
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    const $meInClubStore = useMeInClubStore();

    onMounted(async () => {
      await $meInClubStore.loadByClub(slug.value);

      await load();
    });

    const usersView = computed(() => {
      return (users.value || []).map((user: IFetchedUser) => {
        const roleNames = new Set<string>();
        return {
          ...user,
          member: user.memberInClub,
          userExtsView: user.userExts
            .filter((userExt) => userExt.service === 'tg')
            .map((userExt) => {
              return userExt.getAccount.name;
            }),
          rolesView: user.rolesInClub
            .map((role) => {
              return {
                name:
                  role.clubRole?.name ||
                  role.clubRoleToken?.clubRole?.name ||
                  'unknown',
              };
            })
            .filter((role) =>
              roleNames.has(role.name)
                ? false
                : roleNames.add(role.name) && true
            ),
        };
      });
    });

    const selectedMembers = ref<IFetchedUser[]>([]);

    const message = ref('');

    const activeTab = ref('init');

    const onMakeAnOffer = () => {
      activeTab.value = 'message';
    };

    const onExportCSV = () => {
      alert('onExportCSV');
    };

    const onSendMessageClick = async () => {
      const memberIds = selectedMembers.value.map((m) => m.id);

      if (!club.value.id) return console.error('Club ID is not set');

      const result = await api.post<{ ok: boolean }>(
        `/api/club/${club.value.id}/apps/membersManager/batchSendMessages`,
        {
          userIds: memberIds,
          message: message.value,
        }
      );

      if (result.data.ok) {
        Notify.create({
          message: 'messages are sent to users',
          type: 'Positive',
          classes: 'clubButtonActive',
        });

        activeTab.value = 'init';
        message.value = '';
      }
    };

    const onSearchWalletClick = async () => {
      await load();
    };

    const onSearchNameClick = async () => {
      await load();
    };

    const onRequest = async (props: { pagination: IPagination }) => {
      pagination.value = props.pagination;
      await load();
    };

    // watch(
    //   pagination,
    //   () => load(),
    //   {deep: true},
    // )

    const isPremium = computed(() => $meInClubStore.data?.isPremium);

    const columns = computed(() =>
      [
        {
          name: 'screenName',
          align: 'left',
          label: 'name',
          field: (u: IFetchedUser) => u.screenName || `id${u.id}`,
        },
        { name: 'roles', align: 'left', label: 'roles', field: 'rolesView' },
        isPremium.value
          ? {
              name: 'userExts',
              align: 'left',
              label: 'socials',
              field: 'userExts',
            }
          : undefined,
        { name: 'wallets', align: 'right', label: 'wallet', field: 'wallets' },
        { name: 'buttons', align: 'right', label: '', field: '' },
      ].filter((v) => v)
    );

    return {
      activeTab,
      usersView,
      selectedMembers,
      message,
      searchWalletText,
      searchNameText,
      columns,
      shortenAddress,
      pagination,
      isPremium,
      onExportCSV,
      onMakeAnOffer,
      onSendMessageClick,
      onSearchWalletClick,
      onSearchNameClick,
      onRequest,
      isLoading,
    };
  },
});
</script>
