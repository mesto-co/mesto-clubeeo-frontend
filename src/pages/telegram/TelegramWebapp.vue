<template>
  <q-no-ssr>
    <q-tab-panels v-model="panel" animated class="q-pa-none q-ma-none">
      <q-tab-panel name="main" class="q-pa-none q-ma-none">
        <q-page
          class="clubPage flex flex-center"
          style="padding: 0"
          :style="{ backgroundColor: themeParams.secondary_bg_color }"
        >
          <div
            v-if="club"
            class="full-height full-width"
            style="max-width: 500px; min-height: 100vh"
            :style="{
              backgroundColor: themeParams.bg_color,
              color: themeParams.text_color,
            }"
          >
            <div class="q-py-sm q-px-md text-h6" style="line-height: 36px">
              <div v-if="(club.style || {}).logoImg" class="inline-block">
                <avatar
                  style="width: 32px; top: -1px; border-radius: 16px"
                  :src="club.style.logoImg"
                  :name="club.name"
                  :alt="`${club.name} logo`"
                />
              </div>

              {{ club.name }}
            </div>

            <div
              v-if="club.description"
              class="q-pb-sm q-px-md"
              v-html="club.description"
            />

            <!--        {{club}}-->
            <!--        <div>{{ initData }}</div>-->
            <!--        <div>{{ initDataUnsafe }}</div>-->
            <!--        <div>{{ themeParams }}</div>-->
            <!--        <div>{{ data }}</div>-->

            <!--        <div>{{ themeParams.button_color }}</div>-->

            <q-list class="q-mb-sm" bordered>
              <template v-for="(item, i) in data.menu || []" v-bind:key="i">
                <q-item
                  clickable
                  v-ripple
                  :tag="item.link ? 'a' : undefined"
                  :href="item.link"
                  :target="item.target"
                  @click="menuItemClick(item)"
                >
                  <q-item-section avatar>
                    <q-avatar
                      :round="!item.logoMode || item.logoMode === 'round'"
                      :square="item.logoMode === 'square'"
                    >
                      <img
                        :src="
                          item.logoImg ||
                          club.style.logoImg ||
                          'https://cdn.quasar.dev/img/mountains.jpg'
                        "
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ item.title }}</q-item-label>
                    <q-item-label caption lines="2" style="color: #cccccc">
                      <template
                        v-for="role in item.roles || []"
                        :key="role.name"
                      >
                        <q-badge
                          class="q-mr-xs"
                          :style="{
                            backgroundColor: themeParams.button_color,
                            color: themeParams.button_text_color,
                          }"
                        >
                          {{ role.name }}
                        </q-badge>
                      </template>
                      {{ item.caption }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption style="color: #cccccc">{{
                      item.info
                    }}</q-item-label>
                    <q-item-label caption style="color: #cccccc"></q-item-label>
                    <!--                <q-icon name='check' color='green' />-->
                  </q-item-section>
                </q-item>
              </template>
            </q-list>

            <div
              v-if="((club.buyLinks || {}).collections || []).length > 0"
              class="q-pa-md flex flex-center"
            >
              <template
                v-for="(collection, i) in club.buyLinks.collections || []"
                v-bind:key="i"
              >
                <q-card
                  style="
                    border-radius: 12px;
                    width: 96px;
                    background-color: transparent;
                  "
                  class="q-mr-md q-mb-md"
                  flat
                >
                  <q-img ratio="1" :src="collection.coverImg" />

                  <!--                  :style='{"background-color": "#272736", "border-radius": "0 0 12px 12px"}'-->
                  <q-card-actions class="text-center q-pa-none">
                    <q-btn
                      dense
                      flat
                      no-caps
                      size="sm"
                      class="full-width"
                      :style="{
                        backgroundColor: btnBgColor,
                        color: themeParams.text_color,
                        borderRadius: '0 0 12px 12px',
                      }"
                      type="_a"
                      :href="collection.url"
                    >
                      {{ collection.name }}
                      <div v-if="collection.label">{{ collection.label }}</div>
                      <div v-else-if="collection.siteName">
                        on&nbsp;{{ collection.siteName }}
                      </div>
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </template>
            </div>

            <div
              v-if="
                club.socialLinks &&
                Object.values(club.socialLinks).filter((v) => v).length > 0
              "
              class="text-center q-pa-sm"
            >
              <social-links-snippet :social-links="club.socialLinks" />
            </div>

            <div
              class="q-px-md q-pb-xs flex"
              style="justify-content: space-between"
            >
              <div>@{{ tgUsername }}</div>

              <div class="text-grey">
                your community profile
                <!--            <q-btn icon='edit' dense round size='xs' style='background-color: #272736' flat />-->
              </div>
            </div>

            <div class="q-px-md q-pb-xs">
              <div class="flex">
                <template v-for="role in data.roles || []" :key="role.id">
                  <q-badge
                    class="q-mr-xs q-mb-xs"
                    :style="{
                      backgroundColor: themeParams.button_color,
                      color: themeParams.button_text_color,
                    }"
                  >
                    {{ role.name }}
                  </q-badge>
                </template>
              </div>

              <div>
                <template v-for="badge in data.badges || []" :key="badge.id">
                  <q-card
                    style="
                      border-radius: 12px;
                      background-color: rgb(29, 29, 39);
                      width: 96px;
                    "
                    class="q-mr-xs q-my-xs inline-block"
                    flat
                  >
                    <q-img
                      ratio="1"
                      :src="
                        badge.clubBadge.img ||
                        `https://ui-avatars.com/api/?name=${
                          badge.clubBadge.title || badge.clubBadge.slug
                        }&size=128&bold=true&format=svg&background=1c1c1f&color=fff`
                      "
                    />

                    <q-card-actions class="text-center q-pa-none">
                      <q-btn
                        dense
                        flat
                        no-caps
                        size="sm"
                        class="full-width"
                        style="
                          border-radius: 0 0 12px 12px;
                          background-color: #272736;
                        "
                      >
                        <template v-if="badge.clubBadge.badgeType === 'score'">
                          <q-badge
                            :style="{
                              backgroundColor: themeParams.button_color,
                              color: themeParams.button_text_color,
                            }"
                            class="q-ma-xs"
                            >{{ badge.value }}
                          </q-badge>
                        </template>
                        {{ badge.clubBadge.title }}
                      </q-btn>
                    </q-card-actions>
                  </q-card>

                  <!--                <q-badge class='q-mr-xs q-mb-xs'-->
                  <!--                         :style='{backgroundColor: themeParams.button_color, color: themeParams.button_text_color}'>-->
                  <!--                  {{ badge.clubBadge.title }}-->
                  <!--&lt;!&ndash;                  #{{ badge.index }}&ndash;&gt;-->
                  <!--                </q-badge>-->
                </template>
              </div>

              <!--          <q-badge class='q-mr-xs'>member</q-badge>-->

              <!--          <q-badge class='clubButtonBlue q-mr-xs'>0 score points</q-badge>-->
            </div>

            <div v-if="bio" class="q-px-md q-pb-xs flex">{{ bio }}</div>

            <!--        <div class='q-px-md q-pb-xs flex' style='justify-content: space-between'>-->
            <!--          <div></div>-->

            <!--          <div class='text-grey'>tasks-->
            <!--            <q-btn icon='fa-solid fa-chevron-right' dense round size='xs' style='background-color: #272736' flat />-->
            <!--          </div>-->
            <!--        </div>-->

            <!--        <q-list bordered>-->

            <!--          <q-item clickable v-ripple>-->
            <!--            <q-item-section avatar>-->
            <!--              <q-badge class='clubButtonBlue'>+5</q-badge>-->
            <!--            </q-item-section>-->

            <!--            <q-item-section>-->
            <!--              <q-item-label>daily check-in</q-item-label>-->
            <!--              <q-item-label caption lines='2' style='color: #cccccc'>for-->
            <!--                <q-badge class='clubButtonEmerald q-mr-xs'>verified</q-badge>-->
            <!--              </q-item-label>-->
            <!--            </q-item-section>-->

            <!--            <q-item-section side top>-->
            <!--              <q-item-label caption style='color: #cccccc'>done</q-item-label>-->
            <!--              <q-icon name='check' color='green' />-->
            <!--            </q-item-section>-->

            <!--          </q-item>-->

            <!--          <q-item clickable v-ripple>-->
            <!--            <q-item-section avatar>-->
            <!--              <q-badge class='clubButtonBlue'>+40</q-badge>-->
            <!--            </q-item-section>-->

            <!--            <q-item-section>-->
            <!--              <q-item-label>invite a friend</q-item-label>-->
            <!--              <q-item-label caption lines='2' style='color: #cccccc'>for-->
            <!--                <q-badge class='clubButtonEmerald q-mr-xs'>verified</q-badge>-->
            <!--              </q-item-label>-->
            <!--            </q-item-section>-->

            <!--            <q-item-section side top>-->
            <!--              <q-item-label caption style='color: #cccccc'>done</q-item-label>-->
            <!--              <q-icon name='check' color='green' />-->
            <!--            </q-item-section>-->

            <!--          </q-item>-->

            <!--        </q-list>-->
          </div>
        </q-page>
      </q-tab-panel>

      <q-tab-panel name="dynamic-app" class="q-pa-none q-ma-none">
        <club-page
          sticky="top"
          :header="currentApp ? currentApp.title : ''"
          style="padding: 0"
        >
          <!--          :header='club.name + ": " + (currentApp ? currentApp.title : "")'-->
          <template v-slot:header>
            <q-btn
              @click="appBackClick"
              flat
              dense
              round
              icon="arrow_back"
              style="top: -2px; left: -4px"
            ></q-btn>
          </template>

          <dynamic-app-component
            :club-slug="club.slug"
            :app-slug="currentApp.app.appSlug"
          />
        </club-page>
      </q-tab-panel>
    </q-tab-panels>
  </q-no-ssr>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useRoute } from 'vue-router';
import { IClub } from 'src/api/clubApi';
import ClubPage from 'components/clublayout/ClubPage.vue';
import DynamicAppComponent from 'components/DynamicAppComponent.vue';
import SocialLinksSnippet from 'components/snippets/SocialLinksSnippet.vue';
import Avatar from 'components/elements/Avatar.vue';
import { colors } from 'quasar';
const { blend, changeAlpha } = colors;

interface IData {
  member?: {
    state?: {
      bio?: string;
    };
  };
  userExt?: {
    username?: string;
  };
  menu: Array<IMenuItem>;
  club: IClub;
}

interface IAppMenuItem {
  appSlug: string;
  appName: string;
  title: string;
  icon: string;
}

interface IMenuItem {
  app?: IAppMenuItem;
  link?: string;
  title: string;
  caption?: string;
  roles?: unknown;
  target?: string;
  status?: string;
  info?: string;
  logoImg?: string;
}

interface ITelegramWindow_InitDataUnsafe {
  query_id: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    is_premium: boolean;
  };
  auth_date: string;
  hash: string;
}

interface ITelegramWindow_ThemeParams {
  button_text_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  secondary_bg_color: string;
  bg_color: string;
}

interface ITelegramWindow {
  Telegram: {
    WebApp: {
      initData: string;
      initDataUnsafe: ITelegramWindow_InitDataUnsafe;
      themeParams: ITelegramWindow_ThemeParams;
    };
  };
}

export default defineComponent({
  components: { Avatar, SocialLinksSnippet, DynamicAppComponent, ClubPage },
  setup() {
    const $route = useRoute();

    const clubSlug = computed(() =>
      $route.params.clubSlug ? String($route.params.clubSlug) : null
    );

    const data = ref<Partial<IData>>({});
    const club = ref<Partial<IClub>>({});
    const initData = ref('');
    const initDataUnsafe = ref<Partial<ITelegramWindow_InitDataUnsafe>>({});
    const themeParams = ref<Partial<ITelegramWindow_ThemeParams>>({});

    onMounted(async () => {
      const telegramWebapp = (window as unknown as ITelegramWindow).Telegram
        ?.WebApp;
      initData.value =
        typeof window !== 'undefined' ? telegramWebapp?.initData : 'undefined';
      initDataUnsafe.value =
        typeof window !== 'undefined' ? telegramWebapp?.initDataUnsafe : {};
      themeParams.value =
        typeof window !== 'undefined' ? telegramWebapp?.themeParams : {};

      if (!themeParams.value || Object.keys(themeParams.value).length === 0) {
        themeParams.value = $route.query.themeParams
          ? (JSON.parse(
              String($route.query.themeParams)
            ) as ITelegramWindow_ThemeParams)
          : {
              hint_color: '#b1c3d5',
              text_color: '#ffffff',
              link_color: '#62bcf9',
              button_color: '#2ea6ff',
              secondary_bg_color: '#11117',
              button_text_color: '#ffffff',
              bg_color: '#1d1d27',
            };
      }
      console.log($route.query.themeParams, typeof window !== 'undefined');

      const response = await api.post<IData>('/api/telegram/webApp/load', {
        initData: initData.value || $route.query.initData,
        clubSlug: clubSlug.value,
      });

      data.value = response.data;
      club.value = response.data.club;
    });

    const panel = ref('main');
    const currentApp = ref<IMenuItem | null>(null);

    const menuItemClick = (item: IMenuItem) => {
      if (item.app) {
        panel.value = 'dynamic-app';
        currentApp.value = item;
      }
    };

    const appBackClick = () => {
      panel.value = 'main';
      currentApp.value = null;
    };

    const btnBgColor = computed(() => {
      if (themeParams.value.bg_color && themeParams.value.text_color)
        return blend(
          changeAlpha(themeParams.value.text_color, 0.048),
          themeParams.value.bg_color
        );
      else return themeParams.value.bg_color;
    });

    return {
      initData,
      initDataUnsafe,
      themeParams,
      data,
      club,
      // eslint-disable-next-line
      tgUsername: computed(() => data.value.userExt?.username),
      bio: computed(() => data.value.member?.state?.bio),
      menuItemClick,
      panel,
      currentApp,
      appBackClick,
      btnBgColor,
    };
  },
});
</script>
