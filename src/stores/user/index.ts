import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
// import type { User } from './types';
import type { User } from '@/services/user/types';
const useUserStore = defineStore('user', () => {
  const userInfo = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  const isLogin = computed(() => {
    return accessToken.value !== null;
  });
  const setUserInfo = (data: User | null) => {
    userInfo.value = data;
  };
  const setAccessToken = (token: string | null) => {
    accessToken.value = token;
  };
  return { userInfo, setUserInfo, isLogin, accessToken, setAccessToken };
});

export default useUserStore;
