<template>
  <div class="section-container">
    <h2 class="text-h5 q-mb-md">Проекты</h2>
    <div class="row no-wrap q-gutter-md scroll">
      <q-card v-for="project in projects" :key="project.id" dark class="project-card">
        <q-card-section>
          <div class="text-h6">{{ project.name }}</div>
          <div class="text-caption q-mb-sm">{{ project.description }}</div>

          <div class="text-caption q-mb-sm">
            <q-chip v-for="status in project.status" :key="status" size="sm" color="primary" text-color="white"
              >{{ status }} {{ getStatusEmoji(status) }}</q-chip
            >
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
                  <a class="text-primary" :href="'https://t.me/' + member.telegram.slice(1)">{{ member.telegram }}</a>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <q-chip v-for="role in member.role" :key="role" dense size="sm" color="grey-9" text-color="grey"
                    >{{ role }} {{ getRoleEmoji(role) }}</q-chip
                  >
                </div>
              </div>
            </div>
          </div>

          <div v-if="project.openRoles.length > 0">
            <div class="text-caption text-grey q-mb-xs">Ищем:</div>
            <div class="row items-center q-gutter-x-sm">
              <q-chip
                v-for="role in project.openRoles"
                :key="role.title"
                dense
                size="sm"
                color="grey-9"
                text-color="grey"
                >{{ role.title }} {{ getRoleEmoji(role.title) }}</q-chip
              >
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- <q-btn flat color="grey" class="q-mt-sm" label="все проекты" /> -->
  </div>
</template>

<script setup>
// Helper function for avatars
const getAvatarUrl = (id) => {
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${id}`;
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
  if (role.includes('лидер')) return '👑';
  return '👤';
};

// Demo data for projects
const projects = [
  {
    id: 1,
    name: 'Ядро',
    description: 'Платформа и интеграция с Telegram-ботом',
    status: ['бета-тест'],
    team: [
      {
        name: 'Роман Экземпляров',
        telegram: '@exemplarov',
        role: ['лидер проекта', 'программист'],
        avatar: getAvatarUrl(1),
      },
    ],
    openRoles: [],
  },
  {
    id: 2,
    name: 'Профиль и поиск',
    description: 'Наша уютная соц.сеть',
    status: ['бета-тест', 'сбор команды'],
    team: [
      {
        name: 'Роман Экземпляров',
        telegram: '@exemplarov',
        role: ['программист'],
        avatar: getAvatarUrl(1),
      },
    ],
    openRoles: [{ title: 'лидер проекта' }, { title: 'продуктолог' }, { title: 'программист' }],
  },
  {
    id: 3,
    name: 'Календарь',
    description: 'Мероприятия и вебинары',
    status: ['разработка', 'сбор команды'],
    team: [
      {
        name: 'Артём Гошовский',
        telegram: '@goshovsky',
        role: ['программист'],
        avatar: getAvatarUrl(1000),
      },
    ],
    openRoles: [{ title: 'лидер проекта' }, { title: 'продуктолог' }],
  },
  {
    id: 4,
    name: 'Доска вакансий',
    description: 'Поиск специалистов и проектов',
    status: ['разработка', 'сбор команды'],
    team: [
      {
        name: 'Иван Пода',
        telegram: '@Ivan_Poda',
        role: ['программист'],
        avatar: getAvatarUrl(66),
      },
    ],
    openRoles: [{ title: 'лидер проекта' }, { title: 'продуктолог' }],
  },
  {
    id: 5,
    name: 'Стартапы',
    description: 'База данных стартапов и инвесторов',
    status: ['сбор команды'],
    team: [],
    openRoles: [{ title: 'лидер проекта' }, { title: 'продуктолог' }, { title: 'программист' }],
  },
];
</script>

<style lang="scss" scoped>
.scroll {
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.project-card {
  min-height: 200px;
  min-width: 300px;
  background-color: rgb(29, 29, 39);
  box-shadow: none;

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.q-btn.q-btn--flat {
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}
</style>
