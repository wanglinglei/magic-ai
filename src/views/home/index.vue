<template>
  <PageContainer>
    <SplashCursor />
    <div class="w-80% mx-auto py-12">
      <div class="w-full grid grid-cols-4 gap-6">
        <BannerList />
      </div>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { PageContainer } from '@/components/page';
import { SplashCursor, GradientText, GlitchText } from '@/components/animationComponents';
import BannerList from './components/bannerList.vue';
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
