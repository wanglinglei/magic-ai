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
  /**
   * @description: 是否完善信息
   * @return {*}
   */
  const isComplete = computed(() => {
    return (
      userInfo.value?.avatar &&
      userInfo.value?.nickname &&
      userInfo.value?.username &&
      userInfo.value?.gender &&
      userInfo.value?.email &&
      userInfo.value?.province &&
      userInfo.value?.city
    );
  });

  const hasShowCompleteModal = ref(false);

  const setHasShowCompleteModal = (value: boolean) => {
    hasShowCompleteModal.value = value;
  };

  const setUserInfo = (data: User | null) => {
    userInfo.value = data;
  };
  const setAccessToken = (token: string | null) => {
    accessToken.value = token;
  };
  return {
    userInfo,
    setUserInfo,
    isLogin,
    accessToken,
    setAccessToken,
    isComplete,
    hasShowCompleteModal,
    setHasShowCompleteModal,
  };
});

export default useUserStore;
