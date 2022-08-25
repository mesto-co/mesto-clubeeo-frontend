import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('layouts/PublicLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },

  {
    path: '/auth/wallet-login',
    component: () => import('layouts/PublicLayout.vue'),
    children: [{ path: '', component: () => import('pages/wallet/Login.vue') }],
  },

  {
    path: '/:clubSlug',
    component: () => import('layouts/ClubLandingLayout.vue'),
    children: [
      { path: '', name: 'club', component: () => import('pages/club/ClubRootPage.vue') },
      { path: 'wallet-login', name: 'club-wallet-login', component: () => import('pages/club/WalletLoginPage.vue') },
    ],
  },

  {
    path: '/me',
    component: () => import('layouts/MeLayout.vue'),
    children: [
      { path: 'club/new', name: 'club-new', component: () => import('pages/me/ClubCreate.vue') },
    ]
  },

  // {
  //   path: '/clubs/:clubSlug',
  //   component: () => import('layouts/ClubLandingLayout.vue'),
  //   children: [
  //     { path: '', name: 'cryptoKitties', component: () => import('pages/club/ClubRootPage.vue')}
  //   ],
  // },

  {
    path: '/:clubSlug',
    component: () => import('layouts/ClubLayout.vue'),
    children: [
      { path: 'home', name: 'club-home', component: () => import('pages/club/ClubHome.vue')},
      { path: 'home/edit', name: 'club-home-edit', component: () => import('pages/club/ClubHomeEdit.vue')},
      { path: 'roles/:roleId', name: 'club-role-by-id', component: () => import('pages/club/ClubRole.vue')},
      { path: 'roles', name: 'club-roles', component: () => import('pages/club/ClubRoles.vue')},
      { path: 'members', name: 'club-members', component: () => import('pages/club/ClubMembers.vue')},
      { path: 'members/:userId', name: 'club-member-by-user-id', component: () => import('pages/club/ClubMemberByUserId.vue')},
      { path: 'me', name: 'club-me', component: () => import('pages/club/ClubMe.vue')},
    ],
  },

  {
    path: '/telegram',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      { path: 'webapp', name: 'telegram-webapp', component: () => import('pages/telegram/TelegramWebapp.vue')},
    ]
  },

  //------------
  // DEMO
  //------------

  {
    path: '/near-demo-page',
    component: () => import('layouts/ClubLandingLayout.vue'),
    children: [
      { path: '', name: 'near-demo-page', component: () => import('pages/NearDemoPage.vue')},
    ],
  },

  {
    path: '/demo/public',
    component: () => import('layouts/ClubLandingLayout.vue'),
    children: [
      { path: 'contest', name: 'demo-contest', component: () => import('pages/demo/club/DemoPublicContest.vue')},
    ],
  },

  {
    path: '/demo/club',
    component: () => import('layouts/DemoClubLayout.vue'),
    children: [
      { path: 'home', name: 'demo-club-home', component: () => import('pages/demo/club/DemoClubHome.vue')},
      { path: 'me', name: 'demo-club-me', component: () => import('pages/demo/club/DemoClubMe.vue')},
      // { path: 'roles/:roleId', name: 'dashboard-role', component: () => import('pages/dashboard/DashboardRole.vue')},
      { path: 'roles', name: 'demo-club-roles', component: () => import('pages/demo/club/DemoClubRoles.vue')},
      { path: 'members', name: 'demo-club-members', component: () => import('pages/demo/club/DemoClubMembers.vue')},
      { path: 'contests/create', name: 'demo-contest-create', component: () => import('pages/demo/club/DemoClubContestCreate.vue')},
    ],
  },

  //------------
  // END of DEMO
  //------------

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'notFound',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
