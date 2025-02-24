import { RouteRecordRaw } from 'vue-router';
import { appManagerRoutes } from '@modules/appManager/appManagerRoutes';
import { automationRoutes } from '@modules/automation/automationRoutes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('@layouts/PublicLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@pages/Index.vue'),
        meta: { clubSlug: 'mesto' },
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@pages/auth/LogInPage.vue'),
        meta: { clubSlug: 'mesto' },
      },
    ],
  },

  // {
  //   path: '/demo',
  //   component: () => import('@layouts/PublicLayout.vue'),
  //   children: [
  //     {
  //       path: 'profile',
  //       name: 'demo-profile',
  //       component: () => import('@apps/ProfileApp/ProfileApp.vue'),
  //     },
  //   ],
  // },

  {
    path: '/auth/wallet-login',
    component: () => import('@layouts/PublicLayout.vue'),
    children: [{ path: '', component: () => import('@pages/wallet/Login.vue') }],
  },

  {
    path: '/:clubSlug',
    component: () => import('@layouts/ClubLandingLayout.vue'),
    children: [
      {
        path: '',
        name: 'club',
        component: () => import('@pages/club/ClubRootPage.vue'),
      },
      {
        path: 'dev-page/:pageSlug',
        component: () => import('@pages/club/DevPage.vue'),
      },
      {
        path: 'wallet-login',
        name: 'club-wallet-login',
        component: () => import('@pages/club/WalletLoginPage.vue'),
      },
    ],
  },

  {
    path: '/me',
    component: () => import('@layouts/MeLayout.vue'),
    children: [
      { path: '', name: 'me', component: () => import('@pages/MePage.vue') },
      {
        path: 'club/new',
        name: 'club-new',
        component: () => import('@pages/me/ClubCreate.vue'),
      },
    ],
  },

  // {
  //   path: '/clubs/:clubSlug',
  //   component: () => import('@layouts/ClubLandingLayout.vue'),
  //   children: [
  //     { path: '', name: 'cryptoKitties', component: () => import('@pages/club/ClubRootPage.vue')}
  //   ],
  // },

  {
    path: '/:clubSlug',
    component: () => import('@layouts/ClubLayout.vue'),
    children: [
      ...automationRoutes,
      ...appManagerRoutes,

      {
        path: 'home',
        name: 'club-home',
        component: () => import('pages/mesto/MestoHomePage.vue'),
      },
      {
        path: 'home/edit',
        name: 'club-home-edit',
        component: () => import('@pages/club/ClubHomeEdit.vue'),
      },
      {
        path: 'home/roadmap/edit',
        name: 'club-home-roadmap-edit',
        component: () => import('@pages/club/ClubRoadmapEdit.vue'),
      },

      {
        path: 'members',
        name: 'club-members',
        component: () => import('@pages/club/ClubMembers.vue'),
      },

      {
        path: 'members/:memberId',
        name: 'club-member',
        component: () => import('@pages/club/ClubMember.vue'),
        meta: { parent: { name: 'club-members' } },
      },

      {
        path: 'roles/:roleId',
        name: 'club-role-by-id',
        component: () => import('@pages/club/ClubRole.vue'),
      },
      {
        path: 'roles',
        name: 'club-roles',
        component: () => import('@pages/club/ClubRoles.vue'),
      },

      {
        path: 'badges',
        name: 'club-badges',
        component: () => import('@pages/club/ClubBadges.vue'),
      },

      {
        path: 'analytics',
        name: 'club-analytics',
        component: () => import('@pages/club/ClubAnalytics.vue'),
      },

      {
        path: 'me',
        name: 'club-me',
        component: () => import('@pages/club/ClubMe.vue'),
      },

      {
        path: 'page/:appSlug',
        name: 'club-app-page',
        component: () => import('@pages/club/apps/PageApp.vue'),
      },
      {
        path: 'posts/:appSlug',
        name: 'club-app-posts',
        component: () => import('@pages/club/post/ClubPostsPage.vue'),
      },
      {
        path: 'posts/:appSlug/new',
        name: 'club-app-posts-new',
        component: () => import('@pages/club/post/NewPostPage.vue'),
      },

      {
        path: ':appSlug',
        name: 'club-dynamic-app',
        component: () => import('@pages/DynamicAppPage.vue'),
      },
      {
        path: ':appSlug/config',
        name: 'club-dynamic-app-config',
        component: () => import('@pages/DynamicAppConfigPage.vue'),
      },
      {
        path: ':appSlug/:appPage',
        name: 'club-dynamic-app-page',
        component: () => import('@pages/DynamicAppPage.vue'),
      },
    ],
  },

  {
    path: '/telegram',
    component: () => import('@layouts/PublicLayout.vue'),
    children: [
      {
        path: 'webapp',
        name: 'telegram-webapp',
        component: () => import('@pages/telegram/TelegramWebapp.vue'),
      },
      {
        path: 'webapp/:clubSlug',
        name: 'telegram-webapp-club',
        component: () => import('@pages/telegram/TelegramWebapp.vue'),
      },
      {
        path: 'webapp-demo',
        name: 'telegram-webapp-demo',
        component: () => import('@pages/telegram/TelegramWebappDemo.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'notFound',
    component: () => import('@pages/Error404.vue'),
  },
];

routes.push({
  path: '/demo/:clubSlug',
  component: () => import('@layouts/ClubLayout.vue'),
  children: [
    {
      path: 'root',
      component: () => import('pages/demo/MestoRootPage.vue'),
    },
  ],
});

// const routes: RouteRecordRaw[] = clubeeoRoutes;

export default routes;
