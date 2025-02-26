<template>
  <main class="club-page q-pa-md">
    <section class="categories">
      <div class="row no-wrap q-gutter-sm q-pb-md scroll">
        <q-btn
          v-for="category in categories"
          :key="category"
          outline
          rounded
          no-caps
          color="white"
          :label="category"
          class="text-no-wrap"
        />
      </div>
    </section>

    <section class="content-section">
      <!-- Events -->
      <events-widget />

      <!-- Telegram Chats -->
      <telegram-chats-widget />

      <!-- Members -->
      <div class="section-container">
        <member-profiles-widget />
      </div>

      <!-- Projects -->
      <projects-widget />

      <!-- Startups -->
      <!-- <div class="section-container">
        <h2 class="text-h5 q-mb-md">Новые стартапы</h2>
        <div class="row no-wrap q-gutter-md scroll">
          <q-card v-for="startup in startups" :key="startup.id" dark class="startup-card">
            <q-card-section>
              <q-img :src="startup.logo" class="q-mb-md" height="60px" />
              <div class="text-h6">{{ startup.name }}</div>
              <div class="text-caption">{{ startup.description }}</div>
            </q-card-section>
          </q-card>
        </div>
        <q-btn flat color="grey" class="q-mt-sm" label="все стартапы" />
      </div> -->

      <!-- Requests -->
      <!-- <div class="section-container">
        <h2 class="text-h5 q-mb-md">Запросы</h2>
        <div class="row no-wrap q-gutter-md scroll">
          <q-card v-for="request in requests" :key="request.id" dark class="request-card">
            <div class="request-content">
              <q-card-section>
                <div class="text-h6">{{ request.title }}</div>
                <div class="text-caption">{{ request.description }}</div>
              </q-card-section>
            </div>
            <q-card-section class="request-tags">
              <q-chip color="primary" text-color="white" size="sm" dense v-for="tag in request.tags" :key="tag">
                {{ tag }}
              </q-chip>
            </q-card-section>
          </q-card>
        </div>
        <q-btn flat color="grey" class="q-mt-sm" label="все запросы в форуме" />
      </div> -->

      <!-- Community Posts -->
      <!-- <div class="section-container">
        <h2 class="text-h5 q-mb-md">Публикации сообщества</h2>
        <div class="row no-wrap q-gutter-md scroll">
          <q-card v-for="post in communityPosts" :key="post.id" dark class="post-card">
            <q-card-section>
              <q-img :src="post.image" class="q-mb-md" height="100px" />
              <div class="text-h6">{{ post.title }}</div>
              <div class="text-caption">{{ post.description }}</div>
            </q-card-section>
          </q-card>
        </div>
        <q-btn flat color="grey" class="q-mt-sm" label="все публикации в блоге" />
      </div> -->

      <!-- Local Channel Posts -->
      <!-- <div class="section-container">
        <h2 class="text-h5 q-mb-md">Публикации в каналах местных</h2>
        <div class="row no-wrap q-gutter-md scroll">
          <q-card v-for="post in channelPosts" :key="post.id" dark class="channel-card">
            <q-card-section>
              <div class="text-subtitle2 text-grey">{{ post.channel }}</div>
              <div class="text-h6">{{ post.title }}</div>
              <div class="text-caption">{{ post.preview }}</div>
            </q-card-section>
          </q-card>
        </div>
        <q-btn flat color="grey" class="q-mt-sm" label="все каналы сообщества" />
      </div> -->
    </section>
  </main>
</template>

<script setup>
// import { ref } from 'vue';
import MemberProfilesWidget from 'apps/MemberProfilesApp/MemberProfilesWidget.vue';
import ProjectsWidget from 'apps/ProjectsApp/ProjectsWidget.vue';
import EventsWidget from 'apps/EventsApp/EventsWidget.vue';
import TelegramChatsWidget from 'apps/TelegramChatsApp/TelegramChatsWidget.vue';

// Categories
// const categories = [
//   'Лаборатория',
//   'Академия',
//   'Инвесторская',
//   'Отдел Кадров',
//   'Media.HUB',
//   'Нетворкинг',
//   'Менторство',
//   'Акселератор',
//   'Инвестиции',
//   'Коммьюнити',
// ];

// Demo data for startups
// const startups = Array.from({ length: 10 }, (_, i) => ({
//   id: i + 1,
//   logo: `https://picsum.photos/200/100?random=${i + 30}`,
//   name: [
//     'AI Health Monitor',
//     'EcoTrack',
//     'FinFlow',
//     'SmartRetail',
//     'CryptoSecure',
//     'EduTech Pro',
//     'GreenEnergy',
//     'SpaceConnect',
//     'DataGuard',
//     'RoboAssist',
//   ][i],
//   description: [
//     'AI-powered health monitoring system',
//     'Экологический мониторинг',
//     'Финтех решение для МСП',
//     'Smart retail analytics',
//     'Blockchain security platform',
//     'Образовательная платформа',
//     'Renewable energy solutions',
//     'Satellite communication system',
//     'Data protection service',
//     'Robotics automation',
//   ][i],
// }));

// Demo data for requests
// const requests = Array.from({ length: 10 }, (_, i) => ({
//   id: i + 1,
//   title: [
//     'Ищем Frontend разработчика',
//     'Нужен ментор по питчам',
//     'Ищем со-основателя',
//     'Требуется UI/UX дизайнер',
//     'Ищем инвестиции',
//     'Нужна помощь с маркетингом',
//     'Ищем бета-тестеров',
//     'Нужен технический консультант',
//     'Ищем партнеров',
//     'Требуется юрист по IT',
//   ][i],
//   description: [
//     'React, TypeScript, 3+ года опыта',
//     'Подготовка к Demo Day',
//     'Проект в сфере EdTech',
//     'Редизайн B2B платформы',
//     'Seed-раунд, AI проект',
//     'Go-to-market стратегия',
//     'Тестирование MVP',
//     'Консультация по архитектуре',
//     'B2B коллаборации',
//     'Crypto & Blockchain опыт',
//   ][i],
//   tags: [
//     ['#frontend', '#react'],
//     ['#питч', '#презентация'],
//     ['#команда', '#стартап'],
//     ['#дизайн', '#продукт'],
//     ['#инвестиции', '#seed'],
//     ['#маркетинг', '#growth'],
//     ['#тестирование', '#beta'],
//     ['#разработка', '#консалтинг'],
//     ['#партнерство', '#b2b'],
//     ['#право', '#crypto'],
//   ][i],
// }));

// Demo data for community posts
// const communityPosts = Array.from({ length: 10 }, (_, i) => ({
//   id: i + 1,
//   image: `https://picsum.photos/200/100?random=${i + 40}`,
//   title: [
//     'Как привлечь первые инвестиции',
//     'Построение MVP за 30 дней',
//     'Гайд по питчу стартапа',
//     'Тренды AI в 2024',
//     'Как найти product-market fit',
//     'Масштабирование стартапа',
//     'Работа с Open Source',
//     'Выход на международный рынок',
//     'Построение команды',
//     'Управление удаленной командой',
//   ][i],
//   description: [
//     'Пошаговое руководство для стартапов',
//     'Практические советы по разработке',
//     'Секреты успешной презентации',
//     'Обзор последних технологий',
//     'Методология поиска PMF',
//     'Стратегии роста',
//     'Создание community',
//     'Особенности выхода на новые рынки',
//     'HR практики в стартапах',
//     'Remote-first подход',
//   ][i],
// }));

// Demo data for local channel posts
// const channelPosts = Array.from({ length: 10 }, (_, i) => ({
//   id: i + 1,
//   channel: [
//     'Startup Daily',
//     'Tech Hub News',
//     'Venture Capital',
//     'Founders Club',
//     'AI Weekly',
//     'Dev Community',
//     'Product Hunt',
//     'Crypto News',
//     'Digital Trends',
//     'Innovation Lab',
//   ][i],
//   title: [
//     'Новый единорог в EdTech',
//     'Тренды Web3 разработки',
//     'Раунд А: что нужно знать',
//     'Релиз нового AI API',
//     'Изменения на рынке SaaS',
//     'Новости крипторынка',
//     'Инсайты с Demo Day',
//     'Обзор новых инструментов',
//     'Аналитика рынка',
//     'Интервью с основателем',
//   ][i],
//   preview: [
//     'Стартап привлек $100M инвестиций...',
//     'Главные тренды Web3 в 2024...',
//     'Ключевые метрики для привлечения...',
//     'OpenAI представила новый API...',
//     'Как изменился рынок SaaS...',
//     'Обзор главных событий недели...',
//     'Лучшие проекты с Demo Day...',
//     'Топ-5 инструментов для стартапов...',
//     'Исследование рынка показало...',
//     'Эксклюзивное интервью с CEO...',
//   ][i],
// }));
</script>

<style lang="scss" scoped>
.club-page {
  background-color: rgb(17, 17, 23);
  color: white;
  min-height: 100vh;
}

.scroll {
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.section-container {
  margin: 2rem 0;
}

.q-card {
  width: 250px;
  // background: #1a1a1a;
  background-color: rgb(29, 29, 39);
  // border: 2px solid #2b2e3b;
  box-shadow: none;
}

.event-card {
  min-height: 150px;
  min-width: 160px;
}

.member-card {
  min-height: 180px;
  min-width: 130px;
}

.startup-card,
.request-card,
.post-card,
.channel-card {
  min-height: 200px;
  min-width: 200px;
}

.request-card {
  min-height: 200px;
  min-width: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.request-content {
  flex-grow: 1;
}

.request-tags {
  padding-top: 0;
}

// Optional: Add specific styles for the action buttons
.q-btn.q-btn--flat {
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}
</style>
