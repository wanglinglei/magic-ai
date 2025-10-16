<template>
  <header class="bg-white shadow-sm border-b border-gray-100">
    <div class="w-90% mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Title -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-semibold text-gray-900">AI Assistant</h1>
            <p class="text-xs text-gray-500">Powered by Advanced AI</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex items-center space-x-1">
          <button class="px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            Chat
          </button>
          <button class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            Video
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.w-90% {
  width: 90%;
}

.h100px {
  height: 100px;
}
</style>
