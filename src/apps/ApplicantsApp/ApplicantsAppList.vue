<template>
  <club-page sticky="bottom" :loading="applicantsStore.isLoading">
    <div class="row">
      <div class="q-py-md col-12 col-sm-4">
        <!-- Role Filter Dropdown -->
        <q-select
          v-model="selectedRole"
          :options="roleOptions"
          label="Фильтр по роли"
          outlined
          dark
          dense
          @update:model-value="fetchMembers"
        />
      </div>
    </div>

    <!-- Members Table -->
    <q-table
      :rows="applicantsStore.members"
      :columns="columns"
      row-key="id"
      hide-bottom
      dark
      flat
      style="background-color: rgb(29 29 39)"
      v-model:pagination="applicantsStore.pagination"
      :rows-per-page-options="[20, 50, 200]"
      @row-click="onRowClick"
    >
      <template v-slot:body-cell-roles="props">
        <q-td :props="props">
          <!-- {{ props.row.rolesMap }} -->
          <template v-for="(memberRole, i) in props.row.memberRoles" v-bind:key="i">
            <q-chip dense square size="12px" :class="{ [memberRole.clubRole.class]: true }"
              >{{ memberRole.clubRole.name }}
            </q-chip>
          </template>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            v-if="props.row.rolesMap.applicant"
            dense
            no-caps
            color="positive"
            label="Approve"
            class="q-ml-sm"
            @click.stop="changeRole(props.row.id, 'member')"
          />
          <q-btn
            v-if="props.row.rolesMap.applicant"
            dense
            no-caps
            color="negative"
            label="Reject"
            class="q-ml-sm"
            @click.stop="changeRole(props.row.id, 'rejected')"
          />
          <q-btn
            v-if="props.row.rolesMap.rejected"
            dense
            no-caps
            color="positive"
            label="Re-apply"
            class="q-ml-sm"
            @click.stop="changeRole(props.row.id, 'applicant')"
          />
        </q-td>
      </template>
    </q-table>
  </club-page>

  <q-dialog v-model="isDialogOpen">
    <q-card dark class="clubCard" flat style="min-width: min(90vh, 960px)">
      <q-card-section style="max-height: 85vh" class="scroll">
        <applicants-app-profile-show :profile="selectedMember.profile" />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-px-md" style="border-top: 1px solid rgba(0, 0, 0, 0.2)">
        <q-btn label="Отмена" flat no-caps v-close-popup />
        <q-space />
        <q-btn
          v-if="selectedMember.rolesMap.applicant"
          dense
          no-caps
          color="positive"
          label="Approve"
          class="q-ml-sm"
          v-close-popup
          @click="changeRole(selectedMember.id, 'member')"
        />
        <q-btn
          v-if="selectedMember.rolesMap.applicant"
          dense
          no-caps
          color="negative"
          label="Reject"
          class="q-ml-sm"
          v-close-popup
          @click="changeRole(selectedMember.id, 'rejected')"
        />
        <q-btn
          v-if="selectedMember.rolesMap.rejected"
          dense
          no-caps
          color="positive"
          label="Re-apply"
          class="q-ml-sm"
          v-close-popup
          @click="changeRole(selectedMember.id, 'applicant')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineComponent, ref, watch, onMounted } from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { useApplicantsStore } from './applicantsStore';
import ApplicantsAppProfileShow from './ApplicantsAppProfileShow.vue';

defineComponent({
  components: { ClubPage, ApplicantsAppProfileShow },
});

const applicantsStore = useApplicantsStore();

const roleOptions = [
  { label: 'Заявка', value: 'applicant' },
  { label: 'Принят', value: 'member' },
  { label: 'Отклонен', value: 'rejected' },
  { label: 'Гость', value: 'guest' },
];
const selectedRole = ref(roleOptions[0]); // Default role to filter by

// Fetch initial list of members
onMounted(() => {
  applicantsStore.fetchMembers(selectedRole.value.value);
});

watch(selectedRole, (newRole) => {
  applicantsStore.fetchMembers(newRole.value);
});

const columns = [
  { name: 'name', align: 'left', label: 'Name', field: (r) => r.profile?.name },
  {
    name: 'roles',
    align: 'left',
    label: 'Roles',
    field: (r) =>
      Object.entries(r.rolesMap)
        .filter((r) => r[1])
        .map(([k]) => k),
  },
  { name: 'actions', align: 'right', label: 'Actions' },
];

const changeRole = async (memberId, newRole) => {
  await applicantsStore.changeMemberRole(memberId, newRole);
};

const isDialogOpen = ref(false);

const selectedMember = ref(null);
const onRowClick = ($event, row) => {
  selectedMember.value = row;
  isDialogOpen.value = true;
};
</script>
