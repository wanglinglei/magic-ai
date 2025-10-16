import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/chat/index.vue'),
    },
    {
      path: '/videoGenerator',
      name: 'videoGenerator',
      component: () => import('@/views/video/generate/index.vue'),
    },
  ],
});

export default router;
