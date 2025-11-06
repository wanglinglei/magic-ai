import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
// import type { User } from './types';
import type { User } from '@/services/user/types';
const useUserStore = defineStore('user', () => {
  const userInfo = ref<User | null>(null);

  const isLogin = computed(() => {
    return userInfo.value !== null;
  });
  const setUserInfo = (data: User | null) => {
    userInfo.value = data;
  };
  return { userInfo, setUserInfo, isLogin };
});

export default useUserStore;
