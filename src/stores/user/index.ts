import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from './types';
const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const setUser = (data: User | null) => {
    user.value = data;
  };
  return { user, setUser };
});

export default useUserStore;
