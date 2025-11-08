<template>
  <CommonModal
    title="用户注册"
    :visible="visible"
    @confirm="handleSubmit"
    @update:visible="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      class="register-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名（4-20位字符）" clearable />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="请输入密码（6-20位字符）"
          show-password
          clearable
        />
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="formData.confirmPassword"
          type="password"
          placeholder="请再次输入密码"
          show-password
          clearable
        />
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="formData.gender">
          <el-radio value="male">男</el-radio>
          <el-radio value="female">女</el-radio>
          <el-radio value="other">其他</el-radio>
        </el-radio-group>
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
    </el-form>
  </CommonModal>
</template>

<script setup lang="ts">
import { CommonModal } from '@/components/userAction';
import { UserService, GeneralService } from '@/services';
import type { RegisterRequest } from '@/services/user/types';
import type { FormInstance, FormRules } from 'element-plus';
import { elMessageUtils } from '@/utils/elMessage';

const visible = defineModel<boolean>({ default: false });

// 表单数据
const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  gender: '',
  captcha: '',
});

// 验证码相关
const captchaImage = ref<string>('');
const captchaLoading = ref<boolean>(false);

// 表单引用
const formRef = ref<FormInstance>();

// 自定义验证规则：确认密码
const validateConfirmPassword = (
  _rule: unknown,
  value: string,
  callback: (error?: Error) => void,
) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== formData.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

// 表单验证规则
const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 10, message: '用户名长度应为4-10个字符', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: '用户名只能包含字母、数字和下划线',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应为6-20个字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' },
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
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
    console.log('res', res);
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

    // 准备注册数据
    const registerData: RegisterRequest = {
      username: formData.username,
      password: formData.password,
      captcha: formData.captcha,
      gender: formData.gender,
    };

    // 调用注册接口
    const res = await UserService.register(registerData);

    if (res.success) {
      elMessageUtils.success('注册成功！');
      visible.value = false;
      // 重置表单
      resetForm();
    } else {
      elMessageUtils.error(res.message || '注册失败，请重试');
      // 刷新验证码
      refreshCaptcha();
    }
  } catch (error: unknown) {
    console.error('注册失败:', error);
    if (error !== false) {
      // false 表示表单验证失败，不需要提示
      elMessageUtils.error('注册失败，请检查输入信息');
    }
    // 刷新验证码
    refreshCaptcha();
  }
};

// 关闭弹窗
const handleClose = () => {
  visible.value = false;
  resetForm();
};

// 重置表单
const resetForm = () => {
  formRef.value?.resetFields();
  formData.username = '';
  formData.password = '';
  formData.confirmPassword = '';
  formData.gender = 'male';
  formData.captcha = '';
};

// 监听弹窗显示状态，显示时获取验证码
watch(visible, (newVal) => {
  if (newVal) {
    getCaptcha();
  }
});

// 暴露打开方法供父组件调用
defineExpose({
  open: () => {
    visible.value = true;
  },
});
</script>

<style scoped lang="less">
.register-form {
  padding: 10px 0 20px;

  :deep(.el-form-item) {
    margin-bottom: 22px;

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

:deep(.el-radio-group) {
  display: flex;
  gap: 16px;
}

:deep(.el-radio) {
  margin-right: 0;

  .el-radio__label {
    font-size: 14px;
  }
}
</style>
