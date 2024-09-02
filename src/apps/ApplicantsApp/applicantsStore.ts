import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

interface IMember {
  id: string;
  name: string;
  description: string;
  roles: Array<string>;
}

export const useApplicantsStore = defineStore('applicants', {
  state: () => ({
    members: [] as IMember[],
    isLoading: false,
    role: 'applicant',
    pagination: {
      page: 1,
      rowsNumber: null,
      rowsPerPage: 20,
    },
  }),

  actions: {
    async fetchMembers(role?: string) {
      this.isLoading = true;

      if (role) this.role = role;

      try {
        const response = await api.get('/api/club/1/apps/applicants/mesto-applicants/members', {
          params: {
            role: this.role,
            page: this.pagination.page,
            limit: this.pagination.rowsPerPage,
          },
        });
        this.members = response.data.data;
        this.pagination.rowsNumber = response.data.meta.total;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async changeMemberRole(memberId: string, newRole: string) {
      try {
        await api.patch(`/api/club/1/apps/applicants/mesto-applicants/member/${memberId}/role`, { newRole });
        // Refresh the members list after a role change
        this.fetchMembers();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
