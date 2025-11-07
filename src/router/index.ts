import { createRouter, createWebHistory } from 'vue-router';
import { ROUTER_PATH_NAME } from './constants';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: ROUTER_PATH_NAME.HOME,
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: '/chat',
      name: ROUTER_PATH_NAME.CHAT,
      component: () => import('@/views/chat/index.vue'),
    },
    {
      path: '/image',
      name: ROUTER_PATH_NAME.IMAGE,
      component: () => import('@/views/image/index.vue'),
    },
    {
      path: '/video',
      name: ROUTER_PATH_NAME.VIDEO,
      component: () => import('@/views/video/index.vue'),
    },
    {
      path: '/docx',
      name: ROUTER_PATH_NAME.DOCX,
      component: () => import('@/views/docx/index.vue'),
    },
    {
      path: '/user/userInfo',
      name: ROUTER_PATH_NAME.USER_INFO,
      component: () => import('@/views/user/userInfo.vue'),
    },
    {
      path: '/test',
      name: ROUTER_PATH_NAME.TEST,
      component: () => import('@/views/test/index.vue'),
    },
  ],
});

export default router;
