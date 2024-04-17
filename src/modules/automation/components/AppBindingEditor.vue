<template>

  <div class='row q-col-gutter-md'>
    <div class='col-sm col-12'>
      <c-select
        :label='appSelectLabel'
        v-model='selectedAppModel'
        :options='clubAppOptions'
        :show-image='true'
      />
      <!--          </div>-->
      <!--          <div class='col-auto q-pl-sm flex flex-center' style='flex-direction: column'>-->
      <!--            <q-btn-->
      <!--              :to='{name: "club-apps-registry"}'-->
      <!--              round dense-->
      <!--              icon='fa-solid fa-plus'-->
      <!--              class='clubButtonGrey'-->
      <!--            />-->
      <!--          </div>-->

    </div>

    <div class='col-sm col-12'>
      <c-select
        :label='mode'
        v-model='selectedBindingModel'
        :disable='clubAppBindingOptions.length === 0'
        :options='clubAppBindingOptions'
      />
    </div>

    <div class='col-12' v-if='clubAppBinding'>
      <div>
        <app-binding-card
          show-keys flat class='q-pb-md'
          :binding='clubAppBinding'
        />
      </div>

      <trigger-prop-groups
        :props='clubAppBinding.props'
        v-model='propsModel'
      />
    </div>

  </div>

</template>

<script lang='ts'>
import { computed, defineComponent, PropType, ref, watch } from 'vue';

import { useAppTriggerStore } from 'src/modules/automation/useAppTriggerStore';
import { useLoadIndex } from 'src/uses/useLoaders';
import { api } from 'boot/axios';
import { IClubApp, IAppEvent, IAppAction } from 'src/modules/appManager/shared/IAppConfig';

import AppBindingCard from 'src/modules/automation/components/AppBindingCard.vue';
import CSelect from 'src/components/elements/CSelect.vue';
import TriggerPropGroups from 'src/modules/automation/components/TriggerPropGroups.vue';

interface IOption {
  label: string,
  value: string,
  caption: string,
  img?: string,
  children?: Array<IOption>
}

interface IClubAppsItem {
  id: number,
  title: string,
  appSlug: string,
  app: {
    key: string,
    description: string
    coverImg: string,
    name: string,
    version: string,
    tags: string,
  }
}

export default defineComponent({
  components: { TriggerPropGroups, AppBindingCard, CSelect },
  props: {
    mode: {
      type: String as PropType<'event' | 'action'>,
      required: true,
    },
    clubSlug: {
      type: String,
      required: true
    },
    selectedApp: {
      type: Object as PropType<IOption | null>,
      default: null,
    },
    selectedBinding: {
      type: Object as PropType<IOption | null>,
      default: null,
    },
    props: {
      type: Object as PropType<Record<string, string>>
    }
  },
  emits: ['update:selectedApp', 'update:selectedBinding', 'update:props'],
  setup(props, { emit }) {
    const value = useAppTriggerStore();

    const selectedAppModel = computed<IOption | null>({
      get: () => props.selectedApp,
      set: (val) => {
        emit('update:selectedApp', val);
      }
    });

    const selectedBindingModel = computed<IOption | null>({
      get: () => props.selectedBinding || null,
      set: (val) => {
        emit('update:selectedBinding', val);
      }
    });

    const propsModel = computed({
      get: () => props.props || {},
      set: (val) => {
        emit('update:props', val);
      }
    });

    const clubApp = ref<IClubApp | null>(null);

    const { data: appList, isLoading: isAppListLoading } = useLoadIndex<IClubAppsItem, 'clubApps'>({
      url: () => `/api/club/${props.clubSlug}/app/club-apps?filterMode=${props.mode}`,
      key: 'clubApps'
    });
    const clubAppOptions = computed<IOption[]>(() => {
      return appList.value.map(appItem => ({
        label: appItem.title,
        value: String(appItem.id),
        caption: appItem.app?.description || '',
        img: appItem.app?.coverImg
      }));
    });
    watch(clubAppOptions, () => {
      if (selectedAppModel.value) {
        const selectedValue = clubAppOptions.value.filter(v => v.value == selectedAppModel.value?.value)[0];
        if (selectedValue) selectedAppModel.value = selectedValue;
      }
    });
    const isAppLoading = ref(false);
    watch(selectedAppModel, async (value, oldValue) => {
      const appId = selectedAppModel?.value?.value;
      if (!appId) return;

      isAppLoading.value = true;
      clubApp.value = null;
      if (value?.value != oldValue?.value) {
        selectedBindingModel.value = null;
        resetAppBindingProps();
      }

      const result = await api.get<{
        clubApp: IClubApp,
      }>(`/api/club/${props.clubSlug}/app/club-apps/clubAppId:${appId}`);

      clubApp.value = result.data.clubApp;
      isAppLoading.value = false;
    });

    const clubAppBindingOptions = computed<IOption[]>(() => {
      return Object.values(clubApp.value?.app?.[`${props.mode}s`] || {}).map((bindingItem: IAppEvent | IAppAction) => ({
        label: bindingItem.name,
        value: bindingItem.key,
        caption: bindingItem.description
      }));
    });
    watch(clubAppBindingOptions, () => {
      if (selectedBindingModel.value) {
        const selectedValue = clubAppBindingOptions.value.filter(v => v.value == selectedBindingModel.value?.value)[0];
        if (selectedValue) selectedBindingModel.value = selectedValue;
      }
    });
    watch(selectedBindingModel, (value, oldValue) => {
      if (value?.value != oldValue?.value) {
        resetAppBindingProps();
      }
    });

    const clubAppBinding = computed(() => {
      const bindingKey = selectedBindingModel.value?.value;
      if (!bindingKey) return null;
      const appBindings = clubApp.value?.app?.[`${props.mode}s`];
      if (!appBindings) return null;
      const appBinding = appBindings[bindingKey];
      if (!appBinding) return null;
      return appBinding;
    });

    // const propsModel = reactive<Record<string, string>>({});
    const resetAppBindingProps = () => {
      for (const key of Object.keys(propsModel.value)) {
        delete propsModel.value[key];
      }
    };

    return {
      isAppListLoading,
      appList,

      isAppLoading,

      clubApp,
      selectedAppModel,
      clubAppOptions,

      clubAppBindingOptions,
      selectedBindingModel,

      clubAppBinding,
      propsModel,

      value,

      appSelectLabel: computed(() => props.mode == 'event' ? 'source app' : 'target app'),

      isCodeHelpShown: ref(false)
    };
  }
});
</script>
