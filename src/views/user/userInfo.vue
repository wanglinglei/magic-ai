<template>
  <div>
    <Header />
    <div class="w-400px mx-auto py-12">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
        :label-position="'left'"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
            :disabled="!!formData.username"
          />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender" :options="GENDER_OPTIONS" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData.avatar" :src="formData.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="formData.province" placeholder="请输入省份" disabled />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="formData.city" placeholder="请输入城市" disabled />
        </el-form-item>
        <div id="mapContainer" class="w-full h-300px">
          <el-amap v-if="center" :center="center" />
        </div>
      </el-form>
      <CommonButton class="mx-auto mt-24px" text="保存" @click="handleSubmit" />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { Header, Footer } from '@/components/page';
import { GENDER_OPTIONS } from '@/constants';
import { Plus } from '@element-plus/icons';
import { elMessageUtils } from '@/utils/elMessage';
import { CommonButton } from '@/components/userAction';
import { ElAmap, useCitySearch, lazyAMapApiLoaderInstance } from '@vuemap/vue-amap';
import { UserService } from '@/services';
import type { FormInstance } from 'element-plus';
import type { User } from '@/services/user/types';

const center = ref<number[] | null>(null);

onBeforeMount(() => {
  lazyAMapApiLoaderInstance.then(() => {
    useCitySearch().then((res) => {
      const { getLocalCity } = res;
      getLocalCity().then((cityResult) => {
        center.value = cityResult.bounds.getCenter().toArray();
        // console.log('cityResult: ', cityResult);
        const { province, city } = cityResult;
        formData.value.province = province;
        formData.value.city = city;
      });
    });
  });
});

const formData = ref<any>({
  username: '',
  nickname: '',
  gender: 'male',
  email: '',
  avatar: '',
  province: '',
  city: '',
});
const getUserInfo = async () => {
  const res = await UserService.getUserInfo();
  if (res.success) {
    formData.value = res.data;
  } else {
    elMessageUtils.error(res.message);
  }
};

onMounted(() => {
  getUserInfo();
});

const uploadUrl = import.meta.env.VITE_API_URL + '/general/upload';
const handleAvatarSuccess = (response: any) => {
  if (response.success) {
    formData.value.avatar = response.data.url;
  } else {
    elMessageUtils.error(response.message);
  }
};

const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const beforeAvatarUpload = (file: File) => {
  if (!fileTypes.includes(file.type)) {
    elMessageUtils.error('上传头像图片只能是 JPG、PNG、GIF、WEBP 格式!');
    return false;
  }
  if (file.size > 5 * 1024 * 1024) {
    elMessageUtils.error('上传头像图片大小不能超过 5MB!');
    return false;
  }
  return true;
};

const formRef = ref<FormInstance>();
const router = useRouter();
const handleSubmit = async () => {
  if (!formRef.value) return;
  try {
    await formRef.value.validate();
    const res = await UserService.updateUserInfo(formData.value);
    if (res.success) {
      elMessageUtils.success('更新用户信息成功');
      router.back();
    } else {
      elMessageUtils.error(res.message);
    }
  } catch (error) {}
};

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
  province: [{ required: true, message: '请选择省份', trigger: 'blur' }],
  city: [{ required: true, message: '请选择城市', trigger: 'blur' }],
};
</script>

<style lang="less">
.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  text-align: center;
}
</style>
