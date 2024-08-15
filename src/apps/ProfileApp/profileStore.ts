import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

interface IProfileData {
  name: string;
  description: string;
  whoami: string;
  aboutMe: string;
  location: string;
  projectName: string;
  projectAbout: string;
  projectUrl: string;
  projectStatuses: Array<string>;
  socialLinks: Record<string, string>;
  professions: Array<string>;
  industries: Array<string>;
  skills: Array<string>;
  workplaces: Array<string>;
  education: Array<string>;
}

interface IProfileRoles {
  applicant: boolean;
  member: boolean;
  guest: boolean;
  rejected: boolean;
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    isLoading: true,
    name: 'Иван Иванов',
    description: 'CEO Kutikuli',
    whoami: 'человек с проектом',
    socialLinks: {
      tiktok: '',
      telegram: '',
      discord: '',
      instagram: '',
      twitter: '',
      reddit: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      web: '',
    } as Record<string, string>,
    professions: ['Разработчик', 'Тимлид', 'Продавец'] as string[],
    industries: ['HoReCa', 'Space', 'FoodTech'] as string[],
    skills: ['менеджмент', 'команды', 'JavaScript', 'TypeScript', 'Agile', 'OKR'] as string[],
    workplaces: ['Facebook', 'Yandex', 'Stripe', 'Kutikuli'] as string[],
    education: ['МГУ', 'Stanford'] as string[],
    aboutMe: `Делал карьеру в HoReCa - продавал туры в отели в Кемере для состоятельных людей 
                  в Сибири. Потом понял, что не мое и решил переквалифицироваться в разработчики. 
                  Тут затянуло и помимо разработки на компанию - делаю свой супертехнологичный проект 
                  дешевых туров в дорогие отели, чтобы каждый мог прикоснуться к роскоши, тк все это заслужили и иное несправедливо. 
                  Ищу в сообществе единомышленников и помощь с развитием проекта. Мне очень нужна команда.`,
    project: {
      name: 'Kutikuli',
      link: 'www.kutikuli.com',
      statuses: ['MVP', 'ищу кофаундера'],
      description: '',
    } as {
      name: string;
      link: string;
      statuses: string[];
      description: string;
    },
    roles: {
      applicant: false,
      member: false,
      guest: false,
      rejected: false,
    } as IProfileRoles,
  }),

  getters: {
    projectLink: (state) => `https://${state.project.link}`,
  },

  actions: {
    async fetchProfile() {
      this.isLoading = true;
      try {
        const result = await api.get<{ data: IProfileData; roles: IProfileRoles }>(
          '/api/club/1/apps/profile/mesto-profile/my-profile',
        );
        const profileData = result.data.data;
        const roles = result.data.roles;

        this.name = profileData.name;
        this.description = profileData.description;
        this.professions = profileData.professions;
        this.industries = profileData.industries;
        this.skills = profileData.skills;
        this.workplaces = profileData.workplaces;
        this.education = profileData.education;
        this.aboutMe = profileData.aboutMe;
        this.project = {
          name: profileData.projectName,
          link: profileData.projectUrl,
          statuses: profileData.projectStatuses,
          description: profileData.projectAbout,
        };
        this.socialLinks = profileData.socialLinks;
        this.whoami = profileData.whoami;

        this.roles = roles;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async saveProfile({ onSuccess, onError }: { onSuccess: () => void; onError: (error) => void }) {
      try {
        this.isLoading = true;

        await api.patch('/api/club/1/apps/profile/mesto-profile/my-profile', {
          name: this.name,
          whoami: this.whoami,
          description: this.description,
          professions: this.professions,
          industries: this.industries,
          skills: this.skills,
          workplaces: this.workplaces,
          education: this.education,
          aboutMe: this.aboutMe,
          projectName: this.project.name,
          projectUrl: this.project.link,
          projectStatuses: this.project.statuses,
          projectAbout: this.project.description,
          socialLinks: this.socialLinks,
        });

        onSuccess();
      } catch (error) {
        const errorMessage = (error as Record<string, any>)?.response?.data?.error;
        if (errorMessage) {
          onError({ message: errorMessage });
        } else {
          onError(error);
        }
      } finally {
        this.isLoading = false;
      }
    },
    async apply({ onSuccess, onError }: { onSuccess: () => void; onError: (error) => void }) {
      try {
        this.isLoading = true;

        const result = await api.post<{
          roles: IProfileRoles;
        }>('/api/club/1/apps/profile/mesto-profile/my-profile/apply');

        this.roles = result.data.roles;

        onSuccess();
      } catch (error) {
        const errorMessage = (error as Record<string, any>)?.response?.data?.error;
        if (errorMessage) {
          onError({ message: errorMessage });
        } else {
          onError(error);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
});
