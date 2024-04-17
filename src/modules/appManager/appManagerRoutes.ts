import { RouteRecordRaw } from 'vue-router';

export const appManagerRoutes: RouteRecordRaw[] = [
  {
    path: 'apps',
    name: 'club-apps',
    component: () => import('src/modules/appManager/pages/ClubAppsPage.vue')
  },
  {
    path: 'apps-registry',
    name: 'club-apps-registry',
    component: () => import('src/modules/appManager/pages/ClubAppsRegistryPage.vue'),
    meta: { parent: {name: 'club-apps'} }
  },
  {
    path: 'app/:appKey/install',
    name: 'club-app-install',
    component: () => import('src/modules/appManager/pages/ClubAppInstallPage.vue'),
    meta: { parent: {name: 'club-apps'} }
  },
  {
    path: 'club-app/:appSlug/manage',
    name: 'club-app-manage',
    component: () => import('src/modules/appManager/pages/ClubAppEditPage.vue'),
    meta: { parent: {name: 'club-apps'} }
  },
  {
    path: 'club-app/:appSlug/logs',
    name: 'club-app-logs',
    component: () => import('src/modules/appManager/pages/ClubAppLogsPage.vue'),
    meta: { parent: {name: 'club-apps'} }
  },
];
