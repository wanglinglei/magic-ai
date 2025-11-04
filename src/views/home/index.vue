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

<style scoped></style>
