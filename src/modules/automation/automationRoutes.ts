import { RouteRecordRaw } from 'vue-router';

export const automationRoutes: RouteRecordRaw[] = [
  {
    path: 'automation',
    name: 'club-automation',
    component: () => import('@pages/club/automation/ClubAutomationPage.vue'),
  },
  // { path: 'automation/:automationId', name: 'club-automation-trigger', component: () => import('@pages/club/automation/ClubAutomation.vue')},
  {
    path: 'automation/trigger/create',
    name: 'club-automation-trigger-create',
    component: () =>
      import('@src/modules/automation/pages/AppTriggerCreatePage.vue'),
    meta: { parent: { name: 'club-automation' } },
  },
  {
    path: 'automation/trigger/:triggerId/edit',
    name: 'club-automation-trigger-edit',
    component: () =>
      import('@src/modules/automation/pages/AppTriggerEditPage.vue'),
    meta: { parent: { name: 'club-automation' } },
  },
  // {
  //   path: 'automation/trigger/:triggerId/edit',
  //   name: 'club-automation-trigger-edit',
  //   component: () => import('@src/modules/automation/pages/TriggerEditPage.vue'),
  //   meta: { parent: { name: 'club-automation' } }
  // }
];
