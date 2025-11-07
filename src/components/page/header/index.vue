<template>
  <div class="w-80% mx-auto flex justify-between items-center p-y-20px bg-transparent">
    <Logo />
    <div class="center-menu"></div>
    <div class="right-user">
      <div v-if="isLogin">
        <el-dropdown>
          <div v-if="userInfo?.avatar" class="w-32px h-32px rounded-full">
            <img :src="userInfo.avatar" alt="avatar" class="w-full h-full rounded-full" />
          </div>
          <div v-else>
            <el-icon :size="30"><User /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="text-center">{{ userInfo?.nickname }}</div>
              <div class="text-center" @click="handleUserInfo">用户信息</div>
              <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div v-else class="flex gap-2">
        <CommonButton text="登录" @click="handleLogin" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '../logo/index.vue';
import { useUserStore } from '@/stores';
import { CommonButton } from '@/components/userAction';
import { ROUTER_PATH_NAME } from '@/router/constants';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const isLogin = computed(() => userStore.isLogin);
const emits = defineEmits(['login', 'register']);
const handleLogin = () => {
  emits('login');
};
const router = useRouter();
const handleLogout = () => {
  userStore.logout();
};
const handleUserInfo = () => {
  router.push({
    name: ROUTER_PATH_NAME.USER_INFO,
  });
};
</script>

<style lang="less" scoped></style>
