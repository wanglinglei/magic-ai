<template>
  <footer class="bg-white border-t border-gray-100 mt-12">
    <div class="w-90% mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <!-- Brand Info -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900">AI Assistant</h3>
            <p class="text-xs text-gray-500">Powered by Advanced AI</p>
          </div>
        </div>

        <!-- Links -->
        <div class="flex items-center space-x-6">
          <a href="#" class="text-sm text-gray-500 hover:text-gray-700 transition-colors">Privacy</a>
          <a href="#" class="text-sm text-gray-500 hover:text-gray-700 transition-colors">Terms</a>
          <a href="#" class="text-sm text-gray-500 hover:text-gray-700 transition-colors">Support</a>
        </div>

        <!-- Copyright -->
        <div class="text-sm text-gray-500">
          © 2024 AI Assistant. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.w-90% {
  width: 90%;
}

.mt-12 {
  margin-top: 48px;
}
</style>
