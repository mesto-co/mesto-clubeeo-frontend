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
      <div class="section-container">
        <h2 class="text-h5 q-mb-md">Ближайшие мероприятия</h2>
        <div class="row no-wrap q-gutter-md scroll">
          <q-card v-for="event in events" :key="event.id" dark class="event-card clubCard">
            <q-card-section>
              <div class="q-mb-sm">
                <div class="text-subtitle1 text-weight-bold">{{ event.date.month }} {{ event.date.day }}</div>
                <div class="text-subtitle2">{{ event.time }}</div>
              </div>
              <div class="text-h6">{{ event.title }}</div>
            </q-card-section>
          </q-card>
        </div>
        <q-btn flat color="grey" class="q-mt-sm" label="посмотреть в Календаре" />
      </div>

      <!-- Members -->
      <div class="section-container">
        <h2 class="text-h5 q-mb-md">Новые участники</h2>
        <div class="row no-wrap q-gutter-md scroll">
          <q-card v-for="member in members" :key="member.id" dark class="member-card">
            <q-card-section class="text-center">
              <q-avatar size="80px">
                <img :src="member.avatar" />
              </q-avatar>
              <div class="text-subtitle1 q-mt-sm">{{ member.name }}</div>
              <div class="text-caption">{{ member.role }}</div>
            </q-card-section>
          </q-card>
        </div>
        <q-btn flat color="grey" class="q-mt-sm" label="все участники сообщества" />
      </div>

      <!-- Projects -->
      <div class="section-container">
        <h2 class="text-h5 q-mb-md">Проекты</h2>
        <div class="row no-wrap q-gutter-md scroll">
          <q-card v-for="project in projects" :key="project.id" dark class="project-card">
            <q-card-section>
              <div class="text-h6">{{ project.name }}</div>
              <div class="text-caption q-mb-sm">{{ project.description }}</div>

              <div class="text-caption q-mb-sm">
                <q-chip size="sm" color="primary" text-color="white">
                  {{ getMainStatus(project.status) }} {{ getStatusEmoji(getMainStatus(project.status)) }}
                </q-chip>
                <q-chip v-if="getSecondaryStatus(project.status)" size="sm" color="primary" text-color="white">
                  {{ getSecondaryStatus(project.status) }} {{ getStatusEmoji(getSecondaryStatus(project.status)) }}
                </q-chip>
              </div>

              <div v-if="project.team.length > 0" class="q-mb-sm">
                <div class="text-caption text-grey q-mb-xs">Команда:</div>
                <div v-for="member in project.team" :key="member.name" class="row items-start q-gutter-x-sm q-mb-sm">
                  <q-avatar size="32px">
                    <img :src="member.avatar" />
                  </q-avatar>
                  <div class="column">
                    <div class="text-caption">
                      {{ member.name }}
                      <a class="text-primary" :href="'https://t.me/' + member.telegram.slice(1)">{{
                        member.telegram
                      }}</a>
                    </div>
                    <div>
                      <q-chip dense size="sm" color="grey-9" text-color="grey"
                        >{{ member.role }} {{ getRoleEmoji(member.role) }}</q-chip
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="project.openRoles.length > 0">
                <div class="text-caption text-grey q-mb-xs">Ищем:</div>
                <div v-for="role in project.openRoles" :key="role.title" class="text-caption">
                  <q-chip dense size="sm" color="grey-9" text-color="grey" class="q-mb-xs"
                    >{{ role.title }} {{ getRoleEmoji(role.title) }}</q-chip
                  >
                  {{ role.description }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <q-btn flat color="grey" class="q-mt-sm" label="все проекты" />
      </div>

      <!-- Startups -->
      <div class="section-container">
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
      </div>

      <!-- Requests -->
      <div class="section-container">
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
      </div>

      <!-- Community Posts -->
      <div class="section-container">
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
      </div>

      <!-- Local Channel Posts -->
      <div class="section-container">
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
      </div>
    </section>
  </main>
</template>

<script setup>
// Categories
const categories = [
  'Лаборатория',
  'Академия',
  'Инвесторская',
  'Отдел Кадров',
  'Media.HUB',
  'Нетворкинг',
  'Менторство',
  'Акселератор',
  'Инвестиции',
  'Коммьюнити',
];

// Demo data for events
const events = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  date: {
    month: ['ДЕК', 'ЯНВ', 'ФЕВ'][i % 3],
    day: Math.floor(Math.random() * 28) + 1,
  },
  title: [
    'Питч-сессия стартапов',
    'Мастер-класс по AI',
    'Нетворкинг-встреча',
    'Demo Day',
    'Хакатон Web3',
    'Круглый стол инвесторов',
    'Workshop: Product Market Fit',
    'Презентация новых проектов',
    'Встреча с экспертами',
    'Стартап завтрак',
  ][i],
  time: `${18 + (i % 3)}:00 МСК`,
}));

// Demo data for members
const members = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  avatar: `https://i.pravatar.cc/150?img=${i + 20}`,
  name: [
    'Анна Смирнова',
    'Максим Петров',
    'Елена Козлова',
    'Дмитрий Иванов',
    'Ольга Соколова',
    'Артем Волков',
    'Мария Морозова',
    'Павел Новиков',
    'Ирина Попова',
    'Сергей Лебедев',
  ][i],
  role: [
    'Product Manager',
    'Tech Lead',
    'UX Designer',
    'Frontend Developer',
    'Marketing Lead',
    'Founder',
    'Business Analyst',
    'Backend Developer',
    'Community Manager',
    'Investment Analyst',
  ][i],
}));

// Demo data for startups
const startups = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  logo: `https://picsum.photos/200/100?random=${i + 30}`,
  name: [
    'AI Health Monitor',
    'EcoTrack',
    'FinFlow',
    'SmartRetail',
    'CryptoSecure',
    'EduTech Pro',
    'GreenEnergy',
    'SpaceConnect',
    'DataGuard',
    'RoboAssist',
  ][i],
  description: [
    'AI-powered health monitoring system',
    'Экологический мониторинг',
    'Финтех решение для МСП',
    'Smart retail analytics',
    'Blockchain security platform',
    'Образовательная платформа',
    'Renewable energy solutions',
    'Satellite communication system',
    'Data protection service',
    'Robotics automation',
  ][i],
}));

// Demo data for requests
const requests = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: [
    'Ищем Frontend разработчика',
    'Нужен ментор по питчам',
    'Ищем со-основателя',
    'Требуется UI/UX дизайнер',
    'Ищем инвестиции',
    'Нужна помощь с маркетингом',
    'Ищем бета-тестеров',
    'Нужен технический консультант',
    'Ищем партнеров',
    'Требуется юрист по IT',
  ][i],
  description: [
    'React, TypeScript, 3+ года опыта',
    'Подготовка к Demo Day',
    'Проект в сфере EdTech',
    'Редизайн B2B платформы',
    'Seed-раунд, AI проект',
    'Go-to-market стратегия',
    'Тестирование MVP',
    'Консультация по архитектуре',
    'B2B коллаборации',
    'Crypto & Blockchain опыт',
  ][i],
  tags: [
    ['#frontend', '#react'],
    ['#питч', '#презентация'],
    ['#команда', '#стартап'],
    ['#дизайн', '#продукт'],
    ['#инвестиции', '#seed'],
    ['#маркетинг', '#growth'],
    ['#тестирование', '#beta'],
    ['#разработка', '#консалтинг'],
    ['#партнерство', '#b2b'],
    ['#право', '#crypto'],
  ][i],
}));

// Demo data for community posts
const communityPosts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/200/100?random=${i + 40}`,
  title: [
    'Как привлечь первые инвестиции',
    'Построение MVP за 30 дней',
    'Гайд по питчу стартапа',
    'Тренды AI в 2024',
    'Как найти product-market fit',
    'Масштабирование стартапа',
    'Работа с Open Source',
    'Выход на международный рынок',
    'Построение команды',
    'Управление удаленной командой',
  ][i],
  description: [
    'Пошаговое руководство для стартапов',
    'Практические советы по разработке',
    'Секреты успешной презентации',
    'Обзор последних технологий',
    'Методология поиска PMF',
    'Стратегии роста',
    'Создание community',
    'Особенности выхода на новые рынки',
    'HR практики в стартапах',
    'Remote-first подход',
  ][i],
}));

// Demo data for local channel posts
const channelPosts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  channel: [
    'Startup Daily',
    'Tech Hub News',
    'Venture Capital',
    'Founders Club',
    'AI Weekly',
    'Dev Community',
    'Product Hunt',
    'Crypto News',
    'Digital Trends',
    'Innovation Lab',
  ][i],
  title: [
    'Новый единорог в EdTech',
    'Тренды Web3 разработки',
    'Раунд А: что нужно знать',
    'Релиз нового AI API',
    'Изменения на рынке SaaS',
    'Новости крипторынка',
    'Инсайты с Demo Day',
    'Обзор новых инструментов',
    'Аналитика рынка',
    'Интервью с основателем',
  ][i],
  preview: [
    'Стартап привлек $100M инвестиций...',
    'Главные тренды Web3 в 2024...',
    'Ключевые метрики для привлечения...',
    'OpenAI представила новый API...',
    'Как изменился рынок SaaS...',
    'Обзор главных событий недели...',
    'Лучшие проекты с Demo Day...',
    'Топ-5 инструментов для стартапов...',
    'Исследование рынка показало...',
    'Эксклюзивное интервью с CEO...',
  ][i],
}));

// Helper functions for status
const getMainStatus = (status) => {
  return status.split(' / ')[0];
};

const getSecondaryStatus = (status) => {
  const parts = status.split(' / ');
  return parts.length > 1 ? parts[1] : null;
};

const getStatusEmoji = (status) => {
  if (status.includes('бета-тест')) return '🧪';
  if (status.includes('разработка')) return '🛠️';
  if (status.includes('сбор команды')) return '👥';
  return '📋';
};

const getRoleEmoji = (role) => {
  if (role.includes('программист')) return '👨‍💻';
  if (role.includes('продуктолог')) return '🎯';
  return '👤';
};

// Demo data for projects
const projects = [
  {
    id: 1,
    name: 'Ядро',
    description: 'Платформа и интеграция с Telegram-ботом',
    status: 'бета-тест',
    team: [
      {
        name: 'Роман Экземпляров',
        telegram: '@exemplarov',
        role: 'программист',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
    ],
    openRoles: [],
  },
  {
    id: 2,
    name: 'Профиль и поиск',
    description: 'Наша уютная соц.сеть',
    status: 'бета-тест / сбор команды',
    team: [
      {
        name: 'Роман Экземпляров',
        telegram: '@exemplarov',
        role: 'программист',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
    ],
    openRoles: [
      { title: 'продуктолог', description: 'улучшение UI/UX, расширение функциональности' },
      { title: 'программист', description: 'улучшение UI/UX, расширение функциональности' },
    ],
  },
  {
    id: 3,
    name: 'Календарь',
    description: 'Мероприятия и вебинары',
    status: 'разработка / сбор команды',
    team: [
      {
        name: 'Артём Гошовский',
        telegram: '@goshovskiy',
        role: 'программист',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
    ],
    openRoles: [],
  },
  {
    id: 4,
    name: 'Доска вакансий',
    description: 'Поиск специалистов и проектов',
    status: 'разработка / сбор команды',
    team: [
      {
        name: 'Иван Пода',
        telegram: '@ipoda',
        role: 'программист',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
    ],
    openRoles: [{ title: 'продуктолог', description: 'улучшение UI/UX, расширение функциональности' }],
  },
  {
    id: 5,
    name: 'Стартапы',
    description: 'База данных стартапов и инвесторов',
    status: 'сбор команды',
    team: [],
    openRoles: [{ title: 'продуктолог', description: 'продумывание UI/UX, функциональности' }],
  },
];
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

.project-card {
  min-height: 200px;
  min-width: 300px;

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
