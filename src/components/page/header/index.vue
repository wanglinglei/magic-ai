<template>
  <div class="w-80% mx-auto flex justify-between items-center p-y-20px bg-transparent">
    <Logo />
    <div class="center-menu"></div>
    <div class="right-user">
      <div v-if="isLogin">
        <el-dropdown>
          <div
            v-if="userInfo?.avatar"
            class="w-32px h-32px rounded-full"
            :style="{ backgroundImage: `url(${userInfo.avatar})` }"
          ></div>
          <div v-else>
            <el-icon :size="30"><User /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="ml-16px">{{ userInfo?.nickname }}</div>
              <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div v-else class="flex gap-2">
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '../logo/index.vue';
import { useUserStore } from '@/stores';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const isLogin = computed(() => userStore.isLogin);
const emits = defineEmits(['login', 'register']);
const handleLogin = () => {
  emits('login');
};
const handleLogout = () => {
  userStore.setUserInfo(null);
};
</script>

<style lang="less" scoped></style>
