import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import('@/views/chat/index.vue'),
    },
    {
      path: '/docx',
      name: 'Docx',
      component: () => import('@/views/docx/index.vue'),
    },
  ],
});

export default router;
