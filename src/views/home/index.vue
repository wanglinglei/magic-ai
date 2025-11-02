<template>
  <PageContainer>
    <SplashCursor />
    <div class="w-80% mx-auto py-12">
      <div class="w-full grid grid-cols-4 gap-6">
        <div
          class="card-container bg-white rounded-20px p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 cursor-pointer"
          v-for="item in HOME_BANNER_LIST"
          :key="item.title"
        >
          <div
            class="icon-container w-80px h-80px rounded-20px flex items-center justify-center mb-6"
          >
            <img :src="item.image" class="w-40px h-40px object-contain" :alt="item.title" />
          </div>
          <div class="text-20px font-bold text-gray-800 mb-3">
            <GradientText :text="item.title" />
          </div>
          <div class="text-14px text-gray-500 mb-6 text-center">{{ item.description }}</div>
          <div class="flex gap-2 flex-wrap justify-center">
            <div
              v-for="(label, index) in item.labels"
              :key="label.text"
              :class="['px-4 py-1.5 rounded-full text-13px font-medium', label.colorClass]"
            >
              {{ label.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { PageContainer } from '@/components/page';
import { SplashCursor, GradientText, GlitchText } from '@/components/animationComponents';
import { HOME_BANNER_LIST } from './constants';
import { APP_INFO } from '@/components/page/header/constants';
</script>

<style scoped>
.card-container {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.card-container:hover {
  transform: translateY(-4px);
}

.icon-container {
  background: linear-gradient(135deg, #e8eeff 0%, #d5dfff 100%);
}
</style>
