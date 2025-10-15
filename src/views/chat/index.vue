<template>
  <div>
    <Header />
    <div class="w-90% mx-auto">
      <Messages :messages="messages" />
      <Sender ref="senderRef" :loading="loading" @send="handleSend" />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { Header, Footer } from '@/compoents/page';
import { Sender, Messages } from '@/compoents/common';
import { chat } from '@/services';
const loading = ref(false);
const senderRef = ref<InstanceType<typeof Sender>>();
const messages = ref([]);

const handleSend = async (value: string) => {
  loading.value = true;
  messages.value.push({ role: 'user', content: value });
  const res = await chat({
    messages: messages.value,
  });
  loading.value = false;
  if (res) {
    messages.value.push(res.choices[0].message);
    senderRef.value?.clearInput();
  }

  console.log('res', res);
};
</script>

<style></style>
