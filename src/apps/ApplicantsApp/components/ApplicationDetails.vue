<template>
  <div v-if="application" class="application-details q-mt-md">
    <q-card dark bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Заявка на вступление</div>
        <div class="text-subtitle2">
          Статус:
          <q-badge :color="statusColor">{{ statusText }}</q-badge>
        </div>
        <div class="text-subtitle2 q-mt-sm">
          Сообщество:
          <q-badge color="primary">{{ communityName }}</q-badge>
        </div>
        <div class="text-caption">Подана: {{ formatDate(application.createdAt) }}</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <div class="text-subtitle2">Основная информация</div>
            <q-list dense>
              <q-item>
                <q-item-section>
                  <q-item-label caption class="white-alpha-6">Имя</q-item-label>
                  <q-item-label>{{ application.name }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption class="white-alpha-6">Город</q-item-label>
                  <q-item-label>{{ application.city }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption class="white-alpha-6">Тип сообщества</q-item-label>
                  <q-item-label>{{ application.communityType }} ({{ communityName }})</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-12 col-md-6">
            <div class="text-subtitle2">Социальные сети</div>
            <div v-if="application.socialLinks && application.socialLinks.length">
              <q-list dense>
                <q-item
                  v-for="(link, index) in application.socialLinks"
                  :key="index"
                  clickable
                  tag="a"
                  :href="link"
                  target="_blank"
                >
                  <q-item-section>
                    <q-item-label>{{ formatLink(link) }}</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-icon name="open_in_new" size="xs" />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div v-else class="text-caption">Не указаны</div>
          </div>
        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <div class="text-subtitle2">О себе</div>
        <p class="text-body2">{{ application.about }}</p>

        <div class="text-subtitle2 q-mt-md">Цели в сообществе</div>
        <p class="text-body2">{{ application.goals }}</p>
      </q-card-section>

      <q-separator dark inset v-if="hasAdditionalData" />

      <q-card-section v-if="hasAdditionalData">
        <div class="text-subtitle2">Дополнительная информация</div>

        <!-- Lab specific fields -->
        <div v-if="application.communityType === 'lab' && application.additionalData">
          <div class="q-mt-sm">
            <div class="text-caption">Описание проекта</div>
            <p class="text-body2">{{ application.additionalData.projectDescription }}</p>
          </div>
          <div class="q-mt-sm">
            <div class="text-caption">Стадия проекта</div>
            <p class="text-body2">{{ formatProjectStage(application.additionalData.projectStage) }}</p>
          </div>
          <div
            class="q-mt-sm"
            v-if="application.additionalData.helpNeeded && application.additionalData.helpNeeded.length"
          >
            <div class="text-caption">Нужна помощь в</div>
            <div class="q-gutter-xs">
              <q-chip v-for="item in application.additionalData.helpNeeded" :key="item" dense size="sm">
                {{ item }}
              </q-chip>
            </div>
          </div>
        </div>

        <!-- Pro specific fields -->
        <div v-if="application.communityType === 'pro' && application.additionalData">
          <div
            class="q-mt-sm"
            v-if="application.additionalData.interactionFormats && application.additionalData.interactionFormats.length"
          >
            <div class="text-caption">Форматы взаимодействия</div>
            <div class="q-gutter-xs">
              <q-chip v-for="item in application.additionalData.interactionFormats" :key="item" dense size="sm">
                {{ item }}
              </q-chip>
            </div>
          </div>
          <div
            class="q-mt-sm"
            v-if="
              application.additionalData.mentoringExperience && application.additionalData.mentoringExperience.length
            "
          >
            <div class="text-caption">Опыт менторства</div>
            <div class="q-gutter-xs">
              <q-chip v-for="item in application.additionalData.mentoringExperience" :key="item" dense size="sm">
                {{ item }}
              </q-chip>
            </div>
          </div>
        </div>

        <!-- Council specific fields -->
        <div v-if="application.communityType === 'council' && application.additionalData">
          <div
            class="q-mt-sm"
            v-if="application.additionalData.initiatives && application.additionalData.initiatives.length"
          >
            <div class="text-caption">Инициативы</div>
            <div class="q-gutter-xs">
              <q-chip v-for="item in application.additionalData.initiatives" :key="item" dense size="sm">
                {{ item }}
              </q-chip>
            </div>
          </div>
          <div
            class="q-mt-sm"
            v-if="application.additionalData.sharingExperience && application.additionalData.sharingExperience.length"
          >
            <div class="text-caption">Опыт, которым готов делиться</div>
            <div class="q-gutter-xs">
              <q-chip v-for="item in application.additionalData.sharingExperience" :key="item" dense size="sm">
                {{ item }}
              </q-chip>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator dark inset v-if="application.status === 'rejected' && application.rejectionReason" />

      <q-card-section v-if="application.status === 'rejected' && application.rejectionReason">
        <div class="text-subtitle2 text-negative">Причина отклонения</div>
        <p class="text-body2">{{ application.rejectionReason }}</p>
      </q-card-section>

      <q-separator dark inset v-if="canManageApplication" />

      <q-card-section v-if="canManageApplication">
        <div class="text-subtitle2">Управление заявкой</div>
        <div class="row q-col-gutter-sm q-mt-sm">
          <div class="col-auto">
            <q-btn
              color="positive"
              label="Принять (Исследователь)"
              :disable="application.status === 'approved'"
              @click="updateStatus('approved', 'researcher')"
            />
          </div>
          <div class="col-auto">
            <q-btn
              color="positive"
              label="Принять (Мастер)"
              :disable="application.status === 'approved'"
              @click="updateStatus('approved', 'master')"
            />
          </div>
          <div class="col-auto">
            <q-btn
              color="positive"
              label="Принять (Легенда)"
              :disable="application.status === 'approved'"
              @click="updateStatus('approved', 'legend')"
            />
          </div>
          <div class="col-auto">
            <q-btn
              color="negative"
              label="Отклонить"
              :disable="application.status === 'rejected'"
              @click="showRejectDialog = true"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Rejection reason dialog -->
    <q-dialog v-model="showRejectDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Причина отклонения</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="rejectionReason"
            type="textarea"
            label="Укажите причину отклонения заявки"
            autofocus
            @keyup.enter="updateStatus('rejected')"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" v-close-popup />
          <q-btn
            flat
            label="Отклонить"
            color="negative"
            @click="updateStatus('rejected')"
            :disable="!rejectionReason"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <div v-else-if="loading" class="text-center q-pa-md">
    <q-spinner color="primary" size="3em" />
    <div class="q-mt-sm">Загрузка заявки...</div>
  </div>
  <div v-else class="text-center q-pa-md">
    <q-icon name="info" size="3em" color="grey" />
    <div class="q-mt-sm">Заявка не найдена</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { date } from 'quasar';

const props = defineProps({
  memberId: {
    type: String,
    required: true,
  },
  canManage: {
    type: Boolean,
    default: false,
  },
});

const $q = useQuasar();
const application = ref(null);
const loading = ref(true);
const showRejectDialog = ref(false);
const rejectionReason = ref('');

// Fetch application data
onMounted(async () => {
  await fetchApplication();
});

const fetchApplication = async () => {
  loading.value = true;
  try {
    const response = await api.get(`/api/club/1/apps/applicants/mesto-applicants/member/${props.memberId}/application`);
    application.value = response.data.data;
  } catch (error) {
    console.error('Error fetching application:', error);
    $q.notify({
      color: 'negative',
      message: 'Не удалось загрузить заявку',
      icon: 'error',
    });
  } finally {
    loading.value = false;
  }
};

// Update application status
const updateStatus = async (status, additionalRole = '') => {
  try {
    const payload = {
      status,
      roles: [additionalRole].filter(Boolean), // additional role to set
      ...(status === 'rejected' && { rejectionReason: rejectionReason.value }),
    };

    await api.patch(`/api/club/1/apps/applicants/mesto-applicants/application/${application.value.id}/status`, payload);

    $q.notify({
      color: status === 'approved' ? 'positive' : 'negative',
      message: status === 'approved' ? 'Заявка принята' : 'Заявка отклонена',
      icon: status === 'approved' ? 'check' : 'close',
    });

    // Refresh application data
    await fetchApplication();
  } catch (error) {
    console.error('Error updating application status:', error);
    $q.notify({
      color: 'negative',
      message: 'Не удалось обновить статус заявки',
      icon: 'error',
    });
  }
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  return date.formatDate(dateString, 'DD.MM.YYYY HH:mm');
};

// Format link for display
const formatLink = (link) => {
  if (!link) return '';
  try {
    const url = new URL(link);
    return url.hostname;
  } catch (e) {
    return link;
  }
};

// Format project stage
const formatProjectStage = (stage) => {
  const stages = {
    idea: 'Идея',
    prototype: 'Прототип',
    mvp: 'MVP',
    growth: 'Рост',
    scaling: 'Масштабирование',
  };
  return stages[stage] || stage;
};

// Computed properties
const statusText = computed(() => {
  if (!application.value) return '';

  const statusMap = {
    pending: 'На рассмотрении',
    approved: 'Одобрена',
    rejected: 'Отклонена',
  };

  return statusMap[application.value.status] || application.value.status;
});

const statusColor = computed(() => {
  if (!application.value) return 'grey';

  const colorMap = {
    pending: 'warning',
    approved: 'positive',
    rejected: 'negative',
  };

  return colorMap[application.value.status] || 'grey';
});

const communityName = computed(() => {
  if (!application.value) return '';

  const communityMap = {
    lab: 'Mesto.Lab',
    pro: 'Mesto.Pro',
    council: 'Mesto.Council',
    kitchen: 'Mesto.Kitchen',
  };

  return communityMap[application.value.communityType] || application.value.communityType;
});

const hasAdditionalData = computed(() => {
  if (!application.value || !application.value.additionalData) return false;

  // Check if additionalData has any non-empty values
  return Object.values(application.value.additionalData).some((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return !!value;
  });
});

const canManageApplication = computed(() => {
  // disable for now
  // return false;
  return props.canManage && application.value?.status === 'pending';
});
</script>

<style scoped>
.application-details {
  max-width: 900px;
  margin: 0 auto;
}
</style>
