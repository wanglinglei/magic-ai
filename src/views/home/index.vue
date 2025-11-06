<template>
  <div>
    <Header />
    <SplashCursor />
    <div class="w-80% mx-auto py-12">
      <div class="w-full grid grid-cols-4 gap-6">
        <BannerList />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { Header, Footer } from '@/components/page';
import { SplashCursor } from '@/components/animationComponents';
import BannerList from './components/bannerList.vue';
import { UserService } from '@/services/user';
import { useUserStore } from '@/stores';
const userStore = useUserStore();
const route = useRoute();
onMounted(() => {
  thirdSourceLogin();
});

const thirdSourceLogin = async () => {
  const { authCode, state } = route.query;
  if (authCode) {
    const res = await UserService.loginByAlipay(authCode as string);
    if (res.success) {
      const { userInfo } = res.data;
      userStore.setUserInfo(userInfo);
    }
  }
};
</script>

<style scoped></style>
