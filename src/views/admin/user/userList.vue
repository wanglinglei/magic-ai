<template>
  <div class="p-40px">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="60" />
      <el-table-column fixed prop="username" label="用户名" width="100" />
      <el-table-column prop="nickname" label="昵称" width="100" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="avatar" label="头像">
        <template #default="scope">
          <el-image :src="scope.row.avatar" style="width: 50px; height: 50px" />
        </template>
      </el-table-column>
      <el-table-column prop="authScopeTexts" label="权限范围" width="300">
        <template #default="scope">
          <el-tag
            v-for="(text, index) in scope.row.authScopeTexts"
            :key="text"
            :color="colorList[index]"
            effect="dark"
            style="margin-right: 5px"
          >
            {{ text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省份" />
      <el-table-column prop="city" label="城市" />
      <el-table-column prop="sourceText" label="来源" />
      <el-table-column prop="statusText" label="状态" />
      <el-table-column prop="genderText" label="性别" />
      <el-table-column prop="createdAt" label="创建时间" width="180" />
      <el-table-column prop="updatedAt" label="更新时间" width="180" />
    </el-table>
    <el-pagination
      v-model:current-page="page"
      background
      layout="prev, pager, next"
      :total="total"
      style="margin-top: 20px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { genderMap, statusMap, sourceMap, authScopeMap, colorList } from './constants';
import dayjs from 'dayjs';
import { UserService } from '@/services/user';

const tableData = ref();

onMounted(() => {
  getUserList();
});
const total = ref(1);
const page = ref(1);
const getUserList = async () => {
  const response = await UserService.getUserList({ page: page.value, pageSize: 10 });
  total.value = response.data.total;
  const data = response.data.list;
  tableData.value = data.map((item: any) => {
    return {
      ...item,
      genderText: genderMap[item.gender as keyof typeof genderMap],
      statusText: statusMap[item.status as keyof typeof statusMap],
      sourceText: sourceMap[item.source as keyof typeof sourceMap],
      createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
      authScopeTexts: item.authScope
        .split(',')
        .map((scope: string) => authScopeMap[scope as keyof typeof authScopeMap]),
    };
  });
};
</script>

<style></style>
