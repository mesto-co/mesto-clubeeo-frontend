<template>
  <div class="section-container">
    <h2 class="text-h5 q-mb-md">Мероприятия</h2>
    <div class="row no-wrap q-gutter-md scroll">
      <q-card v-for="event in futureEvents" :key="event.id" dark class="event-card">
        <q-card-section>
          <div>
            <span class="text-subtitle2 text-weight-bold q-pr-xs"> {{ formatLocalDate(event.startTime) }} </span>
          </div>
          <div>
            <span class="text-caption q-mb-sm q-pr-xs">
              {{ formatLocalTime(event.startTime) }}-{{ formatLocalTime(event.endTime) }}
            </span>
            <span class="text-grey-6 text-caption">{{ formatTimezone(getUserTimezone()) }}</span>
          </div>
          <div class="text-h6">{{ event.title }}</div>

          <div v-if="event.description" class="text-caption q-mt-sm">
            <div>{{ event.description }}</div>
          </div>

          <!-- Place section -->
          <div v-if="event.place" class="text-caption q-mt-sm">
            <div class="text-grey-6">Место проведения:</div>
            <div>{{ event.place }}</div>
          </div>

          <!-- Buttons section -->
          <div v-if="event.buttons?.length" class="row q-gutter-sm q-mt-sm">
            <q-btn
              v-for="button in event.buttons"
              :key="button.label"
              :label="button.label"
              :icon="button.icon"
              :color="button.color || 'primary'"
              :outline="button.outline"
              :flat="button.flat"
              size="sm"
              :href="button.url"
              target="_blank"
              no-caps
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { format } from 'date-fns-tz';
import { ru } from 'date-fns/locale';

// Base events in ISO format (UTC)
const baseEvents = [
  { startTime: '2025-03-01T08:00:00Z', endTime: '2025-03-01T09:00:00Z' },
  { startTime: '2025-03-15T08:00:00Z', endTime: '2025-03-15T09:00:00Z' },
  { startTime: '2025-03-22T08:00:00Z', endTime: '2025-03-22T09:00:00Z' },
  { startTime: '2025-03-29T08:00:00Z', endTime: '2025-03-29T09:00:00Z' },
  { startTime: '2025-04-05T08:00:00Z', endTime: '2025-04-05T09:00:00Z' },
  { startTime: '2025-04-12T08:00:00Z', endTime: '2025-04-12T09:00:00Z' },
  { startTime: '2025-04-19T08:00:00Z', endTime: '2025-04-19T09:00:00Z' },
  { startTime: '2025-04-26T08:00:00Z', endTime: '2025-04-26T09:00:00Z' },
  { startTime: '2025-05-03T08:00:00Z', endTime: '2025-05-03T09:00:00Z' },
  { startTime: '2025-05-10T08:00:00Z', endTime: '2025-05-10T09:00:00Z' },
].map((event, index) => ({
  id: index + 1,
  title: 'Pitch.Lab',
  startTime: new Date(event.startTime),
  endTime: new Date(event.endTime),
  description: 'Субботний разбор стартап-питчей',
  place: 'Видеозвонок в чате Mesto.Startups',
  buttons: [
    {
      label: 'Ссылка',
      icon: 'fa-solid fa-link',
      color: 'secondary',
      url: 'https://t.me/+G1iBSfZURSZhZmEy',
    },
    {
      label: 'Выступить',
      icon: 'fa-solid fa-microphone',
      color: 'primary',
      url: 'https://airtable.com/appuqxY10x9mEedgN/pag8KJ2UWVIFFbyc3/form',
    },
  ],
}));
// Filter out past events
const futureEvents = computed(() => {
  const now = new Date();
  return baseEvents.filter((event) => event.endTime > now);
});

// Formatting helpers
const formatLocalDate = (date) => {
  return format(date, 'd MMM', { locale: ru }).replace('.', '');
};

const formatLocalTime = (date) => {
  return format(date, 'HH:mm');
};

const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const formatTimezone = (timezone) => {
  // Handle special cases
  if (!timezone || timezone === 'UTC') return 'UTC';

  // Split by '/' and get the last part
  const parts = timezone.split('/');
  const lastPart = parts[parts.length - 1].replace(/_/g, ' ');

  // Special case for America/Argentina/Buenos_Aires etc
  if (parts.length > 2 && parts[parts.length - 2] === 'Argentina') {
    return 'Argentina time';
  }

  // Russian timezone translations
  const russianTimezones = {
    Moscow: 'по Москве',
    Kaliningrad: 'по Калининграду',
    Samara: 'по Самаре',
    Yekaterinburg: 'по Екатеринбургу',
    Novosibirsk: 'по Новосибирску',
    Krasnoyarsk: 'по Красноярску',
    Irkutsk: 'по Иркутску',
    Yakutsk: 'по Якутску',
    Vladivostok: 'по Владивостоку',
    Magadan: 'по Магадану',
    Kamchatka: 'по Камчатке',
    Anadyr: 'по Анадырю',
  };

  // Check if it's a Russian city
  if (parts[0] === 'Europe' || parts[0] === 'Asia') {
    const translation = russianTimezones[lastPart];
    if (translation) return translation;
  }

  return `${lastPart} time`;
};
</script>

<style lang="scss" scoped>
.scroll {
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.event-card {
  min-height: 120px;
  min-width: 250px;
  background-color: rgb(29, 29, 39);
  box-shadow: none;

  // a {
  //   text-decoration: none;
  //   color: white !important;
  //   &:hover {
  //     text-decoration: underline !important;
  //   }
  // }
}
</style>
