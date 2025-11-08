<template>
  <CommonModal title="用户登录" :visible="visible" :show-footer="false">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名" clearable />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
          show-password
          clearable
        />
      </el-form-item>

      <el-form-item label="验证码" prop="captcha">
        <div class="captcha-container">
          <el-input
            v-model="formData.captcha"
            placeholder="请输入验证码"
            clearable
            class="captcha-input"
          />
          <div
            class="captcha-image"
            :class="{ loading: captchaLoading }"
            @click="refreshCaptcha"
            title="点击刷新验证码"
          >
            <img v-if="captchaImage && !captchaLoading" :src="captchaImage" alt="验证码" />
            <span v-else class="captcha-loading">{{
              captchaLoading ? '加载中...' : '点击获取'
            }}</span>
          </div>
        </div>
      </el-form-item>
      <div class="flex justify-center">
        <CommonButton text="立即登录" @click="handleSubmit" :width="'300px'" />
      </div>
      <!-- 底部链接 -->
      <div class="form-footer p-x-40px theme-purple">
        <el-link
          type="primary"
          class="theme-purple"
          :underline="false"
          @click="handleForgotPassword"
        >
          忘记密码？
        </el-link>
        <el-link type="primary" class="theme-purple" :underline="false" @click="handleGoRegister">
          注册账号
        </el-link>
      </div>

      <!-- 第三方登录 -->
      <el-divider>第三方登录</el-divider>
      <div class="third-party-login">
        <el-tooltip content="支付宝登录" placement="top">
          <div class="login-icon alipay" @click="handleAlipayLogin">
            <img src="@/assets/images/home/alipay.png" alt="支付宝登录" class="w-full h-full" />
          </div>
        </el-tooltip>
        <el-tooltip content="即将开放" placement="top">
          <div class="login-icon wechat disabled">
            <i class="i-ri-wechat-fill text-24px"></i>
            <span class="coming-soon">敬请期待</span>
          </div>
        </el-tooltip>
        <el-tooltip content="即将开放" placement="top">
          <div class="login-icon github disabled">
            <i class="i-carbon-logo-github text-24px"></i>
            <span class="coming-soon">敬请期待</span>
          </div>
        </el-tooltip>
        <el-tooltip content="即将开放" placement="top">
          <div class="login-icon qq disabled">
            <i class="i-ri-qq-fill text-24px"></i>
            <span class="coming-soon">敬请期待</span>
          </div>
        </el-tooltip>
      </div>
    </el-form>
  </CommonModal>
</template>

<script setup lang="ts">
import { CommonModal, CommonButton } from '@/components/userAction';
import { UserService, GeneralService } from '@/services';
import type { LoginByUsernameRequest } from '@/services/user/types';
import type { FormInstance, FormRules } from 'element-plus';
import { elMessageUtils } from '@/utils/elMessage';
import { useUserStore } from '@/stores';

const visible = defineModel<boolean>({ default: false });
const userStore = useUserStore();

// 定义 emits
const emits = defineEmits<{
  (e: 'go-register'): void;
  (e: 'forgot-password'): void;
  (e: 'third-party-login', provider: string): void;
}>();

// 表单数据
const formData = reactive({
  username: '',
  password: '',
  captcha: '',
});

// 验证码相关
const captchaImage = ref<string>('');
const captchaLoading = ref<boolean>(false);

// 表单引用
const formRef = ref<FormInstance>();

// 表单验证规则
const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 20, message: '用户名长度应为4-20个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应为6-20个字符', trigger: 'blur' },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 6, message: '验证码长度为4-6位', trigger: 'blur' },
  ],
};

// 获取验证码
const getCaptcha = async () => {
  try {
    captchaLoading.value = true;
    const res = await GeneralService.getCaptcha();
    if (res.success) {
      // 后端直接返回 base64 格式的图片字符串
      captchaImage.value = res.data.image;
    } else {
      elMessageUtils.error('获取验证码失败');
    }
  } catch (error) {
    console.error('获取验证码失败:', error);
    elMessageUtils.error('获取验证码失败，请重试');
  } finally {
    captchaLoading.value = false;
  }
};

// 刷新验证码（点击验证码图片时触发）
const refreshCaptcha = async () => {
  formData.captcha = ''; // 清空验证码输入
  await getCaptcha();
};

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    // 验证表单
    await formRef.value.validate();

    // 准备登录数据
    const loginData: LoginByUsernameRequest = {
      username: formData.username,
      password: formData.password,
      captcha: formData.captcha,
    };

    // 调用登录接口
    const res = await UserService.loginByUsername(loginData);
    console.log('res', res);
    if (res.success) {
      const { userInfo, accessToken } = res.data;
      userStore.setUserInfo(userInfo);
      userStore.setAccessToken(accessToken);
      elMessageUtils.success('登录成功！');
      visible.value = false;
      // 表单会在弹窗关闭时自动重置
    } else {
      elMessageUtils.error(res.message || '登录失败，请重试');
      // 刷新验证码
      refreshCaptcha();
    }
  } catch (error: unknown) {
    console.error('登录失败:', error);
    if (error !== false) {
      // false 表示表单验证失败，不需要提示
      elMessageUtils.error('登录失败，请检查输入信息');
    }
    // 刷新验证码
    refreshCaptcha();
  }
};

// 重置表单
const resetForm = () => {
  formRef.value?.resetFields();
  formData.username = '';
  formData.password = '';
  formData.captcha = '';
};

// 忘记密码
const handleForgotPassword = () => {
  visible.value = false;
  emits('forgot-password');
};

// 去注册
const handleGoRegister = () => {
  visible.value = false;
  emits('go-register');
};

// 监听弹窗显示状态
watch(visible, (newVal) => {
  if (newVal) {
    // 弹窗打开时获取验证码
    getCaptcha();
  } else {
    // 弹窗关闭时重置表单（延迟重置，避免影响关闭动画）
    setTimeout(() => {
      resetForm();
    }, 300);
  }
});

// 第三方登录处理
const handleThirdPartyLogin = (provider: string) => {
  visible.value = false;
  emits('third-party-login', provider);
};

// 支付宝登录
const handleAlipayLogin = () => {
  handleThirdPartyLogin('alipay');
};

// 暴露打开方法供父组件调用
defineExpose({
  open: () => {
    visible.value = true;
  },
});
</script>

<style scoped lang="less">
.login-form {
  padding: 10px 0 20px;

  :deep(.el-form-item) {
    margin-bottom: 24px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .captcha-container {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;

    .captcha-input {
      flex: 1;
    }

    .captcha-image {
      width: 120px;
      height: 40px;
      cursor: pointer;
      border: 1px solid #dcdfe6;
      border-radius: 6px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      background: linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 100%);
      user-select: none;

      &:hover {
        border-color: #409eff;
        box-shadow: 0 2px 12px rgba(64, 158, 255, 0.25);
      }

      &:active {
        transform: scale(0.98);
      }

      &.loading {
        cursor: not-allowed;
        opacity: 0.6;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
      }

      .captcha-loading {
        font-size: 12px;
        color: #909399;
        font-weight: 500;
      }
    }
  }

  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 12px 40px;
    border-top: 1px solid #f0f0f0;

    :deep(.el-link) {
      font-size: 14px;
      font-weight: 500;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  :deep(.el-divider) {
    margin: 32px 0 24px;

    .el-divider__text {
      background-color: #fff;
      padding: 0 16px;
      font-size: 13px;
      color: #909399;
      font-weight: 500;
    }
  }

  .third-party-login {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 32px;
    padding: 8px 0 16px;

    .login-icon {
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid #e4e7ed;
      position: relative;
      background: #fff;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
      }

      &:active {
        transform: translateY(-2px);
      }

      i {
        font-size: 26px;
      }

      &.alipay {
        color: #1677ff;
        border-color: #1677ff;

        &:hover {
          background: linear-gradient(135deg, #e6f4ff 0%, #bae0ff 100%);
          box-shadow: 0 8px 16px rgba(22, 119, 255, 0.25);
        }
      }

      &.wechat {
        color: #07c160;
        border-color: #d9d9d9;
      }

      &.github {
        color: #24292e;
        border-color: #d9d9d9;
      }

      &.qq {
        color: #12b7f5;
        border-color: #d9d9d9;
      }

      &.disabled {
        cursor: not-allowed;
        opacity: 0.4;
        filter: grayscale(0.8);
        border-color: #e4e7ed;

        &:hover {
          transform: none;
          box-shadow: none;
          background: #fff;
        }

        .coming-soon {
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          color: #c0c4cc;
          white-space: nowrap;
          font-weight: 500;
        }
      }
    }
  }
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #303133;
  font-size: 14px;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 0 1px #c0c4cc inset;
  }

  &.is-focus {
    box-shadow: 0 0 0 1px #409eff inset !important;
  }
}

:deep(.el-input__inner) {
  font-size: 14px;
}
</style>
