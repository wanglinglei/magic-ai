<template>
  <div class="h-100vh">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { Header, Footer } from '@/components/page';
</script>

<style></style>
