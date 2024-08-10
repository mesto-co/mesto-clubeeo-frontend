<template>
  <club-page header="Профиль" sticky="bottom" :loading="false">
    <template v-slot:buttons>
      <div>
        <club-button
          class="clubButtonGrey q-px-md q-mr-sm"
          dense
          @click="
            $router.push({
              name: 'club-dynamic-app',
              params: { appPage: '' },
            })
          "
          >Отменить</club-button
        >

        <club-button
          class="clubButtonActive q-px-md q-mr-sm"
          dense
          @click="
            $router.push({
              name: 'club-dynamic-app',
              params: { appPage: '' },
            })
          "
          >Сохранить</club-button
        >
      </div>
    </template>

    <div class="q-pa-md q-mb-md q-border-radius-md">
      <!-- Profile Header -->
      <div class="q-gutter-md q-pa-md row no-wrap items-center">
        <q-avatar size="100px">
          <img :src="`https://api.multiavatar.com/${name}.svg`" />
        </q-avatar>
        <div>
          <div class="text-h5">{{ name }}</div>
          <div class="text-subtitle1">{{ description }}</div>
          <div>
            <q-chip label="CEO Kutikuli" color="primary" text-color="white" />
            <q-chip
              label="Разработчик TypeScript"
              color="primary"
              text-color="white"
            />
          </div>
        </div>
      </div>

      <!-- Tags/Skills Section -->
      <div class="q-pa-md row">
        <div class="col">
          <q-expansion-item icon="work" label="Профессия" default-opened>
            <q-chip
              v-for="profession in professions"
              :key="profession"
              :label="profession"
              class="q-mb-xs"
            />
          </q-expansion-item>
        </div>
        <div class="col">
          <q-expansion-item icon="business" label="Индустрия" default-opened>
            <q-chip
              v-for="industry in industries"
              :key="industry"
              :label="industry"
              class="q-mb-xs"
            />
          </q-expansion-item>
        </div>
      </div>

      <div class="q-pa-md row">
        <div class="col">
          <q-expansion-item icon="school" label="Навыки" default-opened>
            <q-chip
              v-for="skill in skills"
              :key="skill"
              :label="skill"
              class="q-mb-xs"
            />
          </q-expansion-item>
        </div>
      </div>

      <!-- Experience Section -->
      <div class="q-pa-md row">
        <div class="col">
          <q-expansion-item icon="work_outline" label="Работа" default-opened>
            <q-chip
              v-for="workplace in workplaces"
              :key="workplace"
              :label="workplace"
              class="q-mb-xs"
            />
          </q-expansion-item>
        </div>
        <div class="col">
          <q-expansion-item
            icon="school_outline"
            label="Образование"
            default-opened
          >
            <q-chip
              v-for="education in educationList"
              :key="education"
              :label="education"
              class="q-mb-xs"
            />
          </q-expansion-item>
        </div>
      </div>

      <!-- About Me Section -->
      <div class="q-pa-md">
        <q-card dark>
          <q-card-section>
            <div class="text-h6">Обо мне:</div>
            <div>{{ aboutMe }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Project Section -->
      <div class="q-pa-md">
        <q-card dark>
          <q-card-section>
            <div class="text-h6">О проекте:</div>
            <div><strong>Название:</strong> {{ project.name }}</div>
            <div>
              <strong>Ссылки:</strong>
              <a :href="project.link" target="_blank">{{ project.link }}</a>
            </div>
            <div>
              <strong>Статус:</strong>
              <q-chip color="orange">{{ project.status }}</q-chip>
              <q-chip color="yellow">{{ project.cofounderStatus }}</q-chip>
            </div>
            <div><strong>Описание:</strong></div>
            <ul>
              <li v-for="point in project.description" :key="point">
                {{ point }}
              </li>
            </ul>
          </q-card-section>
        </q-card>
      </div>

      <!-- Social Media Links -->
      <div class="q-pa-md">
        <template
          v-for="socCode in Object.keys(socialsList)"
          v-bind:key="socCode"
        >
          <div class="q-pb-sm flex flex-center">
            <q-input
              :label="socCode"
              dark
              outlined
              style="width: 550px"
              v-model="socialLinks[socCode]"
              :rules="[
                (val) =>
                  !val ||
                  val.startsWith('https://') ||
                  'Should start with https://',
              ]"
            >
              <template v-slot:append>
                <q-avatar>
                  <q-icon :name="mapSocialToIcon(socCode)" size="sm" />
                </q-avatar>
              </template>
            </q-input>
          </div>
        </template>

        <!-- <div class="text-caption">Соц.сети:</div>
        <q-input
          filled
          dark
          v-model="socialLinks"
          placeholder="Ссылки на личные и публичные страницы"
        /> -->
      </div>
    </div>
  </club-page>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { appProps } from '@apps/_common/appProps';

defineComponent({
  components: { ClubPage, ClubButton },
  props: appProps,
});

const socialsList = {
  tiktok: 'tiktok',
  telegram: 'telegram',
  discord: 'discord',
  instagram: 'instagram',
  twitter: 'twitter',
  reddit: 'reddit',
  facebook: 'facebook',
  linkedin: 'linkedin',
  youtube: 'youtube',
  web: 'web',
};

const socialToIconMap = {
  tiktok: 'fa-brands fa-tiktok',
  twitter: 'fa-brands fa-twitter',
  instagram: 'fa-brands fa-instagram',
  discord: 'fa-brands fa-discord',
  telegram: 'fa-brands fa-telegram',
  reddit: 'fa-brands fa-reddit',
  facebook: 'fa-brands fa-facebook',
  linkedin: 'fa-brands fa-linkedin',
  youtube: 'fa-brands fa-youtube',
  web: 'fa-solid fa-globe',
};

const mapSocialToIcon = (code) => {
  return socialToIconMap[code];
};

const socialLinks = ref({
  tiktok: '',
  telegram: '',
  discord: '',
  instagram: '',
  twitter: '',
  reddit: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  web: '',
});

const name = ref('Иван Иванов | строю платформы с нуля');
const description = ref('CEO Kutikuli | Разработчик TypeScript');
// const socialLinks = ref('ссылки на личные и публичные страницы');
const professions = ref(['Разработчик', 'Тимлид', 'Продавец']);
const industries = ref(['HoReCa', 'Space', 'FoodTech']);
const skills = ref([
  'менеджмент',
  'команды',
  'JavaScript',
  'TypeScript',
  'Agile',
  'OKR',
]);
const workplaces = ref(['Facebook', 'Yandex', 'Stripe', 'Kutikuli']);
const educationList = ref(['МГУ', 'Stanford']);
const aboutMe =
  ref(`Делал карьеру в HoReCa - продавал туры в отели в Кемере для состоятельных людей 
                в Сибири. Потом понял, что не мое и решил переквалифицироваться в разработчики. 
                Тут затянуло и помимо разработки на компанию - делаю свой супертехнологичный проект 
                дешевых туров в дорогие отели, чтобы каждый мог прикоснуться к роскоши, тк все это заслужили и иное несправедливо. 
                Ищу в сообществе единомышленников и помощь с развитием проекта. Мне очень нужна команда.`);
const project = ref({
  name: 'Kutikuli',
  link: 'www.kutikuli.com',
  status: 'MVP',
  cofounderStatus: 'ищу кофаундера',
  description: [
    'Что из себя представляет - производство товаров, приложение, агентство и тд',
    'Какую проблему решает Ваш продукт;',
    'Кто является целевой аудиторией/кому он будет полезен/для кого сделан;',
  ],
});
</script>

<style>
/* Add custom styles here */
</style>

<!-- <template>
  <club-page header="Demo profile" sticky="bottom" :loading="false">
    Here's the profile page.

    {{ profileData }}
  </club-page>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { appProps } from '@apps/_common/appProps';

defineComponent({
  components: { ClubPage },
  props: appProps,
});

const profileData = ref({
  name: 'Иван Иванов',
  caption: 'Строю платформы'
  aboutMe: 'I am a software engineer.',
});
</script> -->
