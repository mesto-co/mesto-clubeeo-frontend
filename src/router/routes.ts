import { RouteRecordRaw } from 'vue-router';
import clubeeoRoutes from 'clubeeo-front/src/router/routes';
// import { appManagerRoutes } from 'clubeeo-front/src/modules/appManager/appManagerRoutes';
// import { automationRoutes } from 'clubeeo-front/src/modules/automation/automationRoutes';

// clubeeoRoutes[0] = {
//   path: '/',
//   name: 'root',
//   component: () => import('layouts/MainLayout.vue'),
//   children: [
//     {
//       path: '',
//       component: () => import('@pages/IndexPage.vue'),
//       meta: { clubSlug: 'mesto' },
//     }
//   ],
// };

// clubeeoRoutes[5].children = clubeeoRoutes[5].children?.concat(
//   appManagerRoutes,
//   automationRoutes,
// );

// const routes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     name: 'root',
//     component: () => import('layouts/PublicLayout.vue'),
//     children: [
//       {
//         path: '',
//         component: () => import('pages/Index.vue'),
//         meta: { clubSlug: 'mesto' },
//       },
//       {
//         path: 'login',
//         name: 'login',
//         component: () => import('pages/auth/LogInPage.vue'),
//         meta: { clubSlug: 'mesto' },
//       },
//     ],
//   },
// ]

const routes: RouteRecordRaw[] = clubeeoRoutes;

// const routes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     component: () => import('layouts/MainLayout.vue'),
//     children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
//   },

//   // Always leave this as last one,
//   // but you can also remove it
//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/ErrorNotFound.vue'),
//   },
// ];

export default routes;
