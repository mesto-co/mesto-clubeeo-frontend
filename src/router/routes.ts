import { RouteRecordRaw } from 'vue-router';
import clubeeoRoutes from 'clubeeo-front/src/router/routes';

// const clubRoute = clubeeoRoutes.filter((r) => r.path === '/:clubSlug');
// clubRoute[0].children = [
//   {
//     path: 'demo1',
//     component: () => import('pages/demo/MestoRootPage.vue'),
//   },
//   ...(clubRoute[1].children || []),
// ];

clubeeoRoutes.push({
  path: '/demo/:clubSlug',
  component: () => import('@layouts/ClubLayout.vue'),
  children: [
    {
      path: 'root',
      component: () => import('pages/demo/MestoRootPage.vue'),
    },
  ],
});

const routes: RouteRecordRaw[] = clubeeoRoutes;

export default routes;
