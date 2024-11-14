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

interface IProject {
  name: string;
  logo?: string;
  website?: string;
  description: string;
  stage: 'idea' | 'mvp' | 'first_sales' | 'invested' | 'operating_business';
  status: 'active' | 'paused' | 'closed' | 'available';
  pitchDeck?: string;
  videoPitch?: string;
  category: string;
  tags: string[];
  market: string;
  needs: string[];
}

interface IProfileData {
  name: string;
  headline: string;
  aboutMe: string;
  location: string;
  communityGoals: string[];
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

export const useProfileStore = defineStore('profile', {
  state: () => ({
    isLoading: true,
    name: '',
    headline: '',
    location: '',
    communityGoals: [] as string[],
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
    professions: [] as string[],
    industries: [] as string[],
    skills: [] as string[],
    workplaces: [] as IWorkplace[],
    education: [] as IEducation[],
    aboutMe: '',
    projects: [] as IProject[],
    roles: {
      applicant: false,
      member: false,
      guest: false,
      rejected: false,
    } as IProfileRoles,
  }),

  getters: {
    projectLinks: (state) =>
      state.projects.map((project) => (project.website ? project.website : `https://${project.website}`)),
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
        this.headline = profileData.headline;
        this.location = profileData.location;
        this.communityGoals = profileData.communityGoals;
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
          headline: this.headline,
          location: this.location,
          communityGoals: this.communityGoals,
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

export const COMMUNITY_GOALS = [
  'Хочу развивать свой проект',
  'Хочу вырасти как специалист',
  'Хочу инвестировать в команды и проекты',
  'Хочу вырастить личный бренд',
  'Хочу быть ментором или эдвайзером команд',
];

export const PROJECT_CATEGORIES = [
  'AI ML',
  'Квантовые вычисления',
  'Biotech и генетика',
  'Возобновляемые источники энергии и экотехнологии',
  'SpaceTech и колонизация других планет',
  'Нанотехнологии',
  'Цифровые экономики и Blockchain',
  'Кибербезопасность и защита данных',
  'VR AR',
  'Урбанистика и умные города',
  'другое',
];

export const PROJECT_NEEDS = ['инвестиции', 'кофаундер', 'команда'];

export const PROJECT_STAGES = {
  idea: 'Идея',
  mvp: 'MVP',
  first_sales: 'Есть первые продажи',
  invested: 'Получил инвестиции',
  operating_business: 'Действующий бизнес',
};

export const PROJECT_STATUSES = {
  active: 'Работает',
  paused: 'На паузе',
  closed: 'Закрыт',
  available: 'Отдам в добрые руки',
};
