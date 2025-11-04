<template>
  <div>
    <h1>Test</h1>
    <RadioTag title="测试" :options="options" v-model="selectedOption" />
    <CoreSender v-model="senderValue" @submit="handleSubmit">
      <template #header>
        <div class="header-self-wrap">
          <div class="header-self-title">
            <div class="header-left">💯 欢迎使用 Element Plus X</div>
            <div class="header-right">
              <!-- <el-button @click.stop="closeHeader">
                <el-icon><CircleClose /></el-icon>
                <span>关闭头部</span>
              </el-button> -->
            </div>
          </div>
          <div class="header-self-content">🦜 自定义头部内容</div>
        </div>
      </template>
    </CoreSender>
  </div>
</template>

<script setup lang="ts">
import { CoreSender } from '@/components/sender';
import { RadioTag } from '@/components/userAction';
import { ref } from 'vue';
const senderValue = ref('123');
const handleSubmit = (value: string) => {
  console.log(value);
};

const options = [
  {
    label: '选项1',
    value: '1',
  },
  {
    label: '选项2',
    value: '2',
  },
];
const selectedOption = ref('1');
</script>

<style></style>
