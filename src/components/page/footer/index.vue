<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <!-- 上半部分：Logo 和社交媒体 -->
      <div class="flex justify-between items-center mb-8">
        <!-- Logo 区域 -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
            <img class="w-60px h-60px rounded-10px" :src="logoPng" alt="logo" />
          </div>
          <span class="ml-16px text-xl font-semibold text-gray-900 dark:text-white">
            {{ COMPANY_INFO.name }}
          </span>
        </div>

        <!-- 社交媒体图标 -->
        <div class="flex gap-4">
          <a
            v-for="social in SOCIAL_LINKS"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.label"
            class="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <div :class="social.icon" class="text-xl" />
          </a>
        </div>
      </div>

      <!-- 下半部分：版权和导航链接 -->
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-200 dark:border-gray-800"
      >
        <!-- 版权信息 -->
        <div class="text-sm text-gray-600 dark:text-gray-400">
          © {{ COMPANY_INFO.year }} {{ COMPANY_INFO.name }}
          <br class="md:hidden" />
          {{ COMPANY_INFO.copyright }}
        </div>

        <!-- 导航链接 -->
        <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <!-- 主导航 -->
          <nav class="flex gap-6">
            <a
              v-for="link in NAV_LINKS"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {{ link.label }}
            </a>
          </nav>

          <!-- 次级导航 -->
          <!-- <nav class="flex gap-6">
            <a
              v-for="link in SECONDARY_LINKS"
              :key="link.label"
              :href="link.href"
              class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {{ link.label }}
            </a>
          </nav> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { COMPANY_INFO, NAV_LINKS, SECONDARY_LINKS, SOCIAL_LINKS } from './constants';
import logoPng from '@/assets/images/logo1.png';
</script>

<style scoped>
/* 可以根据需要添加额外样式 */
</style>
