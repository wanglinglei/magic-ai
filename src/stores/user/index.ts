import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
// import type { User } from './types';
import type { User } from '@/services/user/types';
import { ROUTER_PATH_NAME } from '@/router/constants';
import router from '@/router';
// LocalStorage 的 key
const STORAGE_KEYS = {
  USER_INFO: 'magic_ai_user_info',
  ACCESS_TOKEN: 'magic_ai_access_token',
  HAS_SHOW_COMPLETE_MODAL: 'magic_ai_has_show_complete_modal',
};

/**
 * @description: 从 localStorage 获取数据
 */
const getStorageItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return null;
  }
};

/**
 * @description: 保存数据到 localStorage
 */
const setStorageItem = <T>(key: string, value: T | null | undefined) => {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error setting ${key} to localStorage:`, error);
  }
};

/**
 * @description: 从 sessionStorage 获取数据
 */
const getSessionItem = <T>(key: string): T | null => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting ${key} from sessionStorage:`, error);
    return null;
  }
};

/**
 * @description: 保存数据到 sessionStorage
 */
const setSessionItem = <T>(key: string, value: T | null | undefined) => {
  try {
    if (value === null || value === undefined) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error setting ${key} to sessionStorage:`, error);
  }
};

const useUserStore = defineStore('user', () => {
  // 从 localStorage 初始化用户数据和 token
  const userInfo = ref<User | null>(getStorageItem<User>(STORAGE_KEYS.USER_INFO));
  const accessToken = ref<string | null>(getStorageItem<string>(STORAGE_KEYS.ACCESS_TOKEN));
  // 从 sessionStorage 初始化弹窗显示状态（仅当前会话有效）
  const hasShowCompleteModal = ref<boolean>(
    getSessionItem<boolean>(STORAGE_KEYS.HAS_SHOW_COMPLETE_MODAL) || false,
  );

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

  const setHasShowCompleteModal = (value: boolean) => {
    hasShowCompleteModal.value = value;
    setSessionItem(STORAGE_KEYS.HAS_SHOW_COMPLETE_MODAL, value);
  };

  const setUserInfo = (data: User | null) => {
    userInfo.value = data;
    setStorageItem(STORAGE_KEYS.USER_INFO, data);
  };

  const setAccessToken = (token: string | null) => {
    accessToken.value = token;
    setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  };

  /**
   * @description: 退出登录，清除所有数据
   */
  const logout = () => {
    userInfo.value = null;
    accessToken.value = null;
    hasShowCompleteModal.value = false;
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.HAS_SHOW_COMPLETE_MODAL);
    router.push({
      name: ROUTER_PATH_NAME.HOME,
    });
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
    logout,
  };
});

export default useUserStore;
