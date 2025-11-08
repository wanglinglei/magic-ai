<template>
  <div>
    <Header @login="handleLogin" />
    <SplashCursor />
    <div class="w-80% mx-auto py-12">
      <div class="w-full grid grid-cols-4 gap-6">
        <BannerList />
      </div>
    </div>
    <Footer />
    <!-- 登录模态框 -->
    <LoginModal
      v-model="loginVisible"
      @go-register="handleSwitchToRegister"
      @forgot-password="handleForgotPassword"
      @third-party-login="handleThirdPartyLogin"
    />
    <!-- 注册模态框 -->
    <RegisterModal v-model="registerVisible" />
  </div>
</template>

<script setup lang="ts">
import { Header, Footer } from '@/components/page';
import { SplashCursor } from '@/components/animationComponents';
import BannerList from './components/bannerList.vue';
import LoginModal from './components/loginModal.vue';
import RegisterModal from './components/registerModal.vue';
import { UserService } from '@/services/user';
import { useUserStore } from '@/stores';
import { elMessageUtils } from '@/utils/elMessage';
import { ElMessageBox } from 'element-plus';
import { ROUTER_PATH_NAME } from '@/router/constants';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const loginVisible = ref(false);
const registerVisible = ref(false);
const hasShowCompleteModal = computed(() => userStore.hasShowCompleteModal);
const isComplete = computed(() => userStore.isComplete);
const isLogin = computed(() => userStore.isLogin);

onMounted(() => {
  thirdSourceLogin();
});

/**
 * @description: 监听登录状态 如果登录则显示完善信息弹窗
 * @return {*}
 */
watch(
  () => isLogin.value,
  (newVal) => {
    if (newVal) {
      // 延迟显示完善信息弹窗，让用户先看到登录成功提示
      setTimeout(() => {
        showCompleteModal();
      }, 500);
    }
  },
);

const showCompleteModal = () => {
  // userStore.setShowCompleteModal(true);
  if (!isComplete.value && !hasShowCompleteModal.value) {
    ElMessageBox.alert('您好，请先完善您的个人信息，以便我们更好地为您服务。', '温馨提示', {
      confirmButtonText: '去完善',
      callback: () => {
        userStore.setHasShowCompleteModal(true);
        router.push({
          name: ROUTER_PATH_NAME.USER_INFO,
        });
      },
    });
  }
};

/**
 * @description: 第三方登录
 * @return {*}
 */
const thirdSourceLogin = async () => {
  const { auth_code } = route.query;
  if (auth_code && !isLogin.value) {
    const res = await UserService.loginByAlipay(auth_code as string);
    if (res.success) {
      const { userInfo, accessToken } = res.data;
      userStore.setUserInfo(userInfo);
      userStore.setAccessToken(accessToken);
      router.push({
        name: ROUTER_PATH_NAME.HOME,
      });
    }
  }
};

// 处理登录
const handleLogin = () => {
  loginVisible.value = true;
};

// 从登录框切换到注册框
const handleSwitchToRegister = () => {
  loginVisible.value = false;
  registerVisible.value = true;
};

// 忘记密码
const handleForgotPassword = () => {
  // TODO: 实现忘记密码功能
  elMessageUtils.info('忘记密码功能开发中...');
};

// 第三方登录处理
const handleThirdPartyLogin = (provider: string) => {
  if (provider === 'alipay') {
    handleAlipayAuth();
  } else {
    elMessageUtils.warning('该登录方式暂未开放，敬请期待');
  }
};

// 支付宝授权登录
const handleAlipayAuth = () => {
  // 支付宝授权地址，根据实际情况配置
  const alipayAuthUrl = import.meta.env.VITE_ALIPAY_AUTH_URL;
  if (alipayAuthUrl) {
    window.open(alipayAuthUrl, '_self');
  } else {
    elMessageUtils.error('支付宝登录配置错误');
  }
};
</script>

<style scoped></style>
