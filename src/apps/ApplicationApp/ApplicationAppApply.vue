<template>
  <club-page sticky="bottom" class="club-page-apply" :loading="loading">
    <div class="profile-apply">
      <!-- <q-tabs
        v-model="currentTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        no-caps
      >
        <q-tab name="rules" label="Правила" />
        <q-tab name="application" label="Заявка" />
        <q-tab name="additional" label="Дополнительно" />
        <q-tab name="submitted" label="Заявка отправлена" />
      </q-tabs> -->

      <q-tab-panels v-model="currentTab" animated class="bg-transparent">
        <q-tab-panel name="rules">
          <div class="q-pb-xl">
            <p>⚠️ Согласие с Правилами и Этикетом</p>

            <p>Сообщество Mesto придерживается ценностей доверия, уважения и конструктивного общения.</p>

            <p>
              Ваше согласие с Правилами и Этикетом, означает, что вы принимаете обязательство соблюдать Правила на
              площадках сообщества, в том числе:
            </p>

            <ol>
              <li>предоставлять правдивую информацию о себе, избегать рекламы и саморекламы (без прямого запроса);</li>
              <li>стремиться решать конфликты напрямую, в уважительной и конструктивной манере;</li>
              <li>
                поддерживать конфиденциальность и не публиковать переписку с другими участниками или в чатах за
                пределами сообщества без согласия на то других участников переписки;
              </li>
              <li>не собирать данные для коммерческого использования;</li>
              <li>не вести политическую и религиозную деятельность в сообществе;</li>
              <li>придерживаться принципов безопасного и уважительного взаимодействия;</li>
              <li>
                поддерживать принцип Взаимопомощи - помогать другим участникам знаниями и опытом, полезными ресурсами и
                оказывать помощь по запросу.
              </li>
            </ol>

            <p>
              Полный текст Правил и Этикета можно прочитать на сайте Mesto (<a
                href="https://mesto.co/rules"
                target="_blank"
                >mesto.co/rules</a
              >).
            </p>

            <p>
              Нажимая на кнопку "Принять Правила и Этикет", вы подтверждаете свое согласие с Правилами и Этикетом и
              даете согласие на обработку персональных данных.
            </p>
          </div>
        </q-tab-panel>

        <q-tab-panel name="application">
          <div class="q-pb-xl">
            <!-- Content for application tab -->
            <div class="text-h6 q-mb-md">Заявка на вступление в Mesto</div>

            <p>
              Мы ценим осознанный подход к участию и стремимся создать среду, где каждый участник разделяет наши
              ценности, открыт к взаимодействию и готов вносить вклад в развитие экосистемы.
            </p>

            <p>
              На основании данных в анкете вам будет присвоен уровень, соответствующий вашему опыту и интересам. Уровень
              определяет, к каким чатам и ресурсам вы получите доступ.
            </p>

            <p>После рассмотрения заявки мы свяжемся с вами для подтверждения статуса и дальнейших шагов.</p>

            <div class="application-form q-pt-lg">
              <q-form @submit="onSubmit" class="q-gutter-md">
                <!-- Name -->
                <q-input
                  v-model="form.name"
                  filled
                  dark
                  label="Как Вас зовут?"
                  :rules="[(val) => !!val || 'Пожалуйста, укажите ваше имя']"
                />

                <!-- City -->
                <q-input
                  v-model="form.city"
                  filled
                  dark
                  label="В каком городе вы живете?"
                  :rules="[(val) => !!val || 'Пожалуйста, укажите город']"
                />

                <!-- About -->
                <div class="form-field">
                  <q-input
                    v-model="form.about"
                    filled
                    dark
                    type="textarea"
                    label="Расскажите о себе: чем вы занимаетесь, какие у вас профессиональные интересы и глобальные цели?"
                    :rules="[(val) => !!val || 'Пожалуйста, расскажите о себе']"
                    autogrow
                    min-rows="3"
                  />
                  <div class="text-caption q-mt-sm">
                    Нам важно понять ваш опыт, сферы деятельности, увлечения и амбиции. Какие проекты или задачи вас
                    вдохновляют? В чем ваша экспертиза? Какое влияние вы хотите оказывать на сообщество и мир? Свободный
                    формат — расскажите так, как считаете нужным.
                  </div>
                </div>

                <!-- Goals -->
                <div class="form-field">
                  <q-input
                    v-model="form.goals"
                    filled
                    dark
                    type="textarea"
                    label="Какие цели вы ставите перед собой в Mesto?"
                    :rules="[(val) => !!val || 'Пожалуйста, укажите ваши цели']"
                    autogrow
                  />
                  <div class="text-caption q-mt-sm">
                    Расскажите, чего вы хотите достичь в сообществе: с кем познакомиться, какие знания получить или
                    передать, какие проекты развивать. Как Mesto может помочь вам в ваших планах, и чем вы сами готовы
                    быть полезны?
                  </div>
                </div>

                <!-- Social Links -->
                <div class="social-links q-mb-md">
                  <div class="text-subtitle1 q-mb-sm">Поделитесь ссылками на ваши открытые профили в соцсетях</div>
                  <div class="q-gutter-y-sm">
                    <q-input
                      v-for="(link, index) in socialLinks"
                      :key="index"
                      v-model="socialLinks[index]"
                      filled
                      dark
                      label="Ссылка на профиль"
                      @update:model-value="handleSocialLinksUpdate"
                    />
                  </div>
                </div>

                <!-- Community Selection -->
                <div class="community-selection q-mb-lg">
                  <div class="text-subtitle1 q-mb-md">К какому сообществу вы хотели бы присоединиться?</div>
                  <p class="text-body2 q-mb-lg">
                    Mesto — это большая экосистема сообществ, где каждый может найти единомышленников. Выберите точку
                    входа и присоединяйтесь к тем, кто движется в том же направлении.
                  </p>

                  <div class="communities-grid q-gutter-md">
                    <q-card
                      v-for="community in communities"
                      :key="community.id"
                      dark
                      bordered
                      class="community-card"
                      :class="{ 'selected-card': form.selectedCommunity === community.id }"
                      @click="form.selectedCommunity = community.id"
                    >
                      <q-card-section>
                        <div class="text-h6">{{ community.name }}</div>
                        <div class="text-subtitle2">{{ community.description }}</div>
                        <div class="text-caption">{{ community.price }}</div>
                      </q-card-section>
                      <q-card-section>
                        <q-radio v-model="form.selectedCommunity" :val="community.id" dark />
                      </q-card-section>
                    </q-card>
                  </div>

                  <p class="text-caption q-mt-md">
                    Подписка на платные чаты — это не просто доступ к сообществу, но и вклад в развитие Mesto: ускорение
                    запуска ключевых функций и сервисов, поддержка IT-инфраструктуры и организационного развития,
                    вложение в создание масштабного сообщества, которое меняет жизни.
                  </p>
                </div>
              </q-form>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="additional">
          <div class="q-pb-xl">
            <!-- Dynamic content based on selected community -->
            <div v-if="form.selectedCommunity === 'lab'">
              <additional-form-lab
                v-model:project-description="additionalData.lab.projectDescription"
                v-model:project-stage="additionalData.lab.projectStage"
                v-model:help-needed="additionalData.lab.helpNeeded"
              />
            </div>
            <div v-else-if="form.selectedCommunity === 'pro'">
              <additional-form-pro
                v-model:interaction-formats="additionalData.pro.interactionFormats"
                v-model:mentoring-experience="additionalData.pro.mentoringExperience"
              />
            </div>
            <div v-else-if="form.selectedCommunity === 'council'">
              <additional-form-council
                v-model:initiatives="additionalData.council.initiatives"
                v-model:sharing-experience="additionalData.council.sharingExperience"
              />
            </div>
            <div v-else-if="form.selectedCommunity === 'kitchen'">
              <additional-form-kitchen />
            </div>
            <div v-else>
              <p>Пожалуйста, выберите сообщество на предыдущем шаге.</p>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="submitted">
          <div class="q-pb-xl text-center">
            <q-icon
              name="check_circle"
              size="4rem"
              color="positive"
              v-if="applicationStatus?.application?.status === 'approved'"
            />
            <q-icon
              name="pending"
              size="4rem"
              color="warning"
              v-else-if="applicationStatus?.application?.status === 'pending' || applicationStatus?.roles?.applicant"
            />
            <q-icon
              name="cancel"
              size="4rem"
              color="negative"
              v-else-if="applicationStatus?.application?.status === 'rejected' || applicationStatus?.roles?.rejected"
            />
            <q-icon name="group" size="4rem" color="primary" v-else-if="applicationStatus?.roles?.member" />
            <q-icon name="check" size="4rem" color="positive" v-else />

            <h4 class="q-mt-md">Статус заявки</h4>
            <p class="q-mt-md">{{ submittedMessage }}</p>

            <div v-if="applicationStatus?.roles?.member" class="q-mt-xl">
              <q-btn
                class="clubButtonActive"
                label="Перейти в профиль"
                :to="{ name: 'club-dynamic-app', params: { appSlug: 'profile' } }"
              />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <template #buttons>
      <q-btn
        v-if="currentTab === 'rules' && applicationStatus?.canApply"
        class="full-width clubButtonActive"
        label="Я принимаю Правила и Этикет"
        no-caps
        @click="nextTab"
      />
      <q-btn
        v-else-if="currentTab === 'application' && applicationStatus?.canApply"
        class="full-width clubButtonActive"
        label="Далее"
        no-caps
        :disable="!isApplicationValid"
        @click="nextTab"
      />
      <q-btn
        v-else-if="currentTab === 'additional' && applicationStatus?.canApply"
        class="full-width clubButtonActive"
        label="Отправить заявку"
        no-caps
        @click="submitApplication"
      />
    </template>
  </club-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import ClubPage from '@components/clublayout/ClubPage.vue';
import AdditionalFormLab from './components/AdditionalFormLab.vue';
import AdditionalFormPro from './components/AdditionalFormPro.vue';
import AdditionalFormCouncil from './components/AdditionalFormCouncil.vue';
import AdditionalFormKitchen from './components/AdditionalFormKitchen.vue';

const $q = useQuasar();
const currentTab = ref('rules');
const tabs = ['rules', 'application', 'additional', 'submitted'];
const loading = ref(false);
const applicationStatus = ref(null);

const form = ref({
  name: '',
  city: '',
  about: '',
  goals: '',
  selectedCommunity: '',
});

const socialLinks = ref(['', '', '']);

// Store additional form data
const additionalData = ref({
  lab: {
    projectDescription: '',
    projectStage: 'idea',
    helpNeeded: [],
  },
  pro: {
    interactionFormats: [],
    mentoringExperience: [],
  },
  council: {
    initiatives: [],
    sharingExperience: [],
  },
});

const communities = [
  {
    id: 'lab',
    name: 'Mesto.Lab',
    description: 'Сообщество Искателей — тех, кто исследует возможности: студенты, стартаперы, специалисты.',
    price: 'free',
  },
  {
    id: 'pro',
    name: 'Mesto.Pro',
    description: 'Сообщество Созидателей — тех, кто создаёт и растёт: эксперты и предприниматели.',
    price: '€ 50/мес',
  },
  {
    id: 'council',
    name: 'Mesto.Council',
    description: 'Сообщество Легенд Mesto — тех, кто меняет правила игры: топ-предприниматели и топ-эксперты.',
    price: '€ 100/мес',
  },
  {
    id: 'kitchen',
    name: 'Начну с Кухни, выберу позже',
    description: '',
    price: 'free',
  },
];

// Fetch application status on mount
onMounted(async () => {
  await fetchApplicationStatus();
});

const fetchApplicationStatus = async () => {
  loading.value = true;
  try {
    const response = await api.get('/api/club/1/apps/application/mesto-application/status');
    applicationStatus.value = response.data.data;

    // If user already applied or is a member, show appropriate message
    if (!applicationStatus.value.canApply) {
      currentTab.value = 'submitted';
    }
  } catch (error) {
    console.error('Error fetching application status:', error);
    $q.notify({
      color: 'negative',
      message: 'Не удалось получить статус заявки',
      icon: 'error',
    });
  } finally {
    loading.value = false;
  }
};

const handleSocialLinksUpdate = () => {
  // Remove extra empty fields (keep at least 3)
  const nonEmptyLinks = socialLinks.value.filter((link) => link.trim());
  const emptyLinksNeeded = Math.max(3 - nonEmptyLinks.length, 1);
  socialLinks.value = [...nonEmptyLinks, ...Array(emptyLinksNeeded).fill('')];
};

const nextTab = () => {
  const currentIndex = tabs.indexOf(currentTab.value);
  if (currentIndex < tabs.length - 1) {
    currentTab.value = tabs[currentIndex + 1];
  }
};

const onSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', {
    ...form.value,
    socialLinks: socialLinks.value.filter((link) => link.trim()),
  });
};

const submitApplication = async () => {
  loading.value = true;

  try {
    // Get the appropriate additional data based on selected community
    const communityData = form.value.selectedCommunity ? additionalData.value[form.value.selectedCommunity] : {};

    // Prepare application data
    const applicationData = {
      ...form.value,
      socialLinks: socialLinks.value.filter((link) => link.trim()),
      additionalData: communityData,
    };

    // Submit application to backend
    const response = await api.post('/api/club/1/apps/application/mesto-application/submit', applicationData);
    console.log('Application submitted:', response.data);

    $q.notify({
      color: 'positive',
      message: 'Заявка успешно отправлена',
      icon: 'check',
    });

    // Update application status
    await fetchApplicationStatus();

    // Move to the submitted tab
    nextTab();
  } catch (error) {
    console.error('Error submitting application:', error);
    $q.notify({
      color: 'negative',
      message: error.response?.data?.error || error.response?.data?.message || 'Ошибка при отправке заявки',
      icon: 'error',
    });
  } finally {
    loading.value = false;
  }
};

const isApplicationValid = computed(() => {
  return form.value.name && form.value.city && form.value.about && form.value.goals && form.value.selectedCommunity;
});

// Computed property to determine what to show on the submitted tab
const submittedMessage = computed(() => {
  if (!applicationStatus.value) return '';

  if (applicationStatus.value.application) {
    const status = applicationStatus.value.application.status;
    if (status === 'pending') {
      return 'Ваша заявка находится на рассмотрении. Мы свяжемся с вами в ближайшее время.';
    } else if (status === 'approved') {
      return 'Ваша заявка одобрена! Добро пожаловать в сообщество.';
    } else if (status === 'rejected') {
      return `Ваша заявка была отклонена. Причина: ${applicationStatus.value.application.rejectionReason || 'Не указана'}`;
    }
  } else if (applicationStatus.value.roles && applicationStatus.value.roles.member) {
    return 'Вы уже являетесь участником сообщества.';
  } else if (applicationStatus.value.roles && applicationStatus.value.roles.applicant) {
    return 'Ваша заявка находится на рассмотрении. Мы свяжемся с вами в ближайшее время.';
  } else if (applicationStatus.value.roles && applicationStatus.value.roles.rejected) {
    return 'Ваша предыдущая заявка была отклонена.';
  }

  return 'Спасибо за вашу заявку! Мы рассмотрим её в ближайшее время.';
});
</script>

<style lang="scss" scoped>
.clubPage.club-page-apply {
  background-color: rgb(17, 17, 23);
  color: #ffffff;
  padding: 0 !important;
}

.profile-apply {
  padding-bottom: 72px; // Space for fixed button
}

.fixed-bottom-button {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

// Add some padding to tab panels content
.q-tab-panel {
  padding: 16px;
}

.community-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.selected-card {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid var(--q-primary);
  }
}

.communities-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.application-form {
  max-width: 800px;
  margin: 0 auto;
}
</style>
