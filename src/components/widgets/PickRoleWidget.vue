<template>
  <q-card dark class='clubCard'>
    <q-card-section class='row items-center q-pb-none'>
      <div class='text-h6'>edit roles</div>
      <q-space />
      <q-btn icon='close' flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      <q-list>
        <q-item v-for='role in roles' :key='role.id'>
          <q-item-section side top>
            <q-checkbox v-model="selectedRoles[role.id]" />
          </q-item-section>

          <q-item-section>
            <div>
              <role-renderer
                :role='role'
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-actions class='float-right'>
      <q-btn
        flat v-close-popup no-caps
      >cancel</q-btn>

      <q-btn
        flat v-close-popup no-caps class='clubButtonActive'
        @click='onSaveClick'
      >save</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang='ts'>
import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
import { getRoles, IGetRolesResponse_Role } from 'src/api/clubApi';
import RoleRenderer from 'components/renderers/RoleRenderer.vue';

export default defineComponent({
  components: { RoleRenderer },
  props: {
    clubSlug: {
      type: String,
      required: true
    },
    selected: {
      type: Array as PropType<Array<{id: number}>>,
      default: () => [],
    }
  },
  emits: ['save'],
  setup(props, {emit}) {
    const roles = ref<Array<IGetRolesResponse_Role>>([]);

    const selectedRoles = reactive<Record<number, boolean>>({});

    const onLoad = async () => {
      roles.value = await getRoles({ clubSlug: props.clubSlug });

      const selectedRoleIds = props.selected.map(role => role.id);
      roles.value.forEach(role => selectedRoles[role.id] = selectedRoleIds.includes(role.id));
    };

    onMounted(async () => {
      await onLoad();
    });
    watch(props, onLoad, { deep: true });

    const onSaveClick = () => {
      emit('save', selectedRoles);
    }

    return {
      roles,
      selectedRoles,
      onSaveClick,
    };
  }
});
</script>
