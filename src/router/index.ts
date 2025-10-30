import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/chat',
      name: 'Chat',
      component: () => import('@/views/chat/index.vue'),
    },
  ],
});

export default router;
