import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

interface IWorkplace {
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  skills: string[];
}

interface IEducation {
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
}

interface IProfileData {
  name: string;
  description: string;
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
  workplaces: Array<IWorkplace>;
  education: Array<IEducation>;
  projects: Array<IProject>;
}

interface IProfileRoles {
  applicant: boolean;
  member: boolean;
  guest: boolean;
  rejected: boolean;
}

interface IProject {
  name: string;
  link: string;
  description: string;
  statuses: string[];
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    isLoading: true,
    name: 'Иван Иванов',
    description: 'CEO Kutikuli',
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
    workplaces: [
      {
        organization: 'Kutikuli',
        position: 'CEO',
        startDate: '2023-01-01',
        endDate: '',
        current: true,
        skills: ['менеджмент', 'JavaScript'],
      },
    ] as IWorkplace[],
    education: [
      {
        institution: 'МГУ',
        degree: 'Информатика',
        startYear: '2018',
        endYear: '2022',
      },
    ] as IEducation[],
    aboutMe: `Делал карьеру в HoReCa - продавал туры в отели в Кемере для состоятельных людей
                  в Сибири. Потом понял, что не мое и решил переквалифицироваться в разработчики.
                  Тут затянуло и помимо разработки на компанию - делаю свой супертехнологичный проект
                  дешевых туров в дорогие отели, чтобы каждый мог прикоснуться к роскоши, тк все это заслужили и иное несправедливо.
                  Ищу в сообществе единомышленников и помощь с развитием проекта. Мне очень нужна команда.`,
    projects: [
      {
        name: 'Kutikuli',
        link: 'www.kutikuli.com',
        statuses: ['MVP', 'ищу кофаундера'],
        description: '',
      },
    ] as IProject[],
    roles: {
      applicant: false,
      member: false,
      guest: false,
      rejected: false,
    } as IProfileRoles,
  }),

  getters: {
    projectLinks: (state) =>
      state.projects.map((project) => (project.link.startsWith('http') ? project.link : `https://${project.link}`)),
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
        this.projects = profileData.projects;
        this.socialLinks = profileData.socialLinks;
        this.roles = roles;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async saveProfile({ onSuccess, onError }: { onSuccess: () => void; onError: (error: any) => void }) {
      try {
        this.isLoading = true;

        await api.patch('/api/club/1/apps/profile/mesto-profile/my-profile', {
          name: this.name,
          description: this.description,
          professions: this.professions,
          industries: this.industries,
          skills: this.skills,
          workplaces: this.workplaces,
          education: this.education,
          aboutMe: this.aboutMe,
          projects: this.projects,
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
