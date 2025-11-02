<template>
  <div class="w-80% mx-auto flex justify-between items-center p-y-20px">
    <div class="left-logo flex justify-start items-center">
      <img class="w-60px h-60px rounded-10px" :src="logoPng" alt="logo" />
      <div class="ml-16px">
        <div class="text-24px font-bold">{{ APP_INFO.name }}</div>
        <div class="text-16px text-gray-500">{{ APP_INFO.description }}</div>
      </div>
    </div>
    <div class="center-menu"></div>
    <div class="right-user">
      <div v-if="user">
        <el-dropdown>
          <div
            v-if="user.avatar"
            class="w-32px h-32px rounded-full"
            :style="{ backgroundImage: `url(${user.avatar})` }"
          ></div>
          <div v-else>
            <el-icon :size="30"><User /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="ml-16px">{{ user.name }}</div>
              <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div v-else>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoPng from '@/assets/images/logo1.png';
import { ElButton } from 'element-plus';
import { User, UserFilled } from '@element-plus/icons';
import { useUserStore } from '@/stores';
const userStore = useUserStore();
const user = computed(() => userStore.user);

const APP_INFO = {
  name: import.meta.env.VITE_APP_NAME,
  description: import.meta.env.VITE_APP_DESCRIPTION,
};

const handleLogin = () => {
  userStore.setUser({
    id: '1',
    name: '汪汪',
    // avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  });
};

const handleLogout = () => {
  userStore.setUser(null);
};
</script>

<style lang="less" scoped></style>
