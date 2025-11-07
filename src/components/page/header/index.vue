<template>
  <div class="w-80% mx-auto flex justify-between items-center p-y-20px bg-transparent">
    <Logo />
    <div class="center-menu"></div>
    <div class="right-user">
      <div v-if="isLogin">
        <el-dropdown>
          <div class="w-40px h-40px rounded-full">
            <img
              :src="userInfo?.avatar || defaultAvatar"
              alt="avatar"
              class="w-full h-full rounded-full"
              @error="avatarError"
            />
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
const defaultAvatar =
  'https://p3-passport.byteacctimg.com/img/user-avatar/5a3f65c1808beb286a51c56d7a0903b4~80x80.awebp';
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

const avatarError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = defaultAvatar;
};
</script>

<style lang="less" scoped></style>
