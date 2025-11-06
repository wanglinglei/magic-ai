<template>
  <el-dialog v-model="modalVisible" title="Warning" width="500" align-center>
    <template #header>
      <div class="modal-header">
        <slot name="header" v-if="slots.header"></slot>
        <div v-else>
          <GradientText :text="title" />
        </div>
      </div>
    </template>
    <slot></slot>
    <template #footer v-if="showFooter">
      <div class="dialog-footer">
        <el-button @click="closeModal"> {{ cancelText }} </el-button>
        <el-button type="primary" @click="handleConfirm"> {{ confirmText }} </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { GradientText } from '@/components/animationComponents';
const {
  title = '',
  visible = false,
  confirmText = '确认',
  cancelText = '取消',
  showFooter = true,
} = defineProps<{
  title?: string;
  visible: boolean;
  confirmText?: string;
  cancelText?: string;
  showFooter?: boolean;
}>();

const slots = useSlots();

const emits = defineEmits<{
  (e: 'confirm'): void;
  (e: 'update:visible', value: boolean): void;
}>();
const handleConfirm = () => {
  emits('confirm');
};
const modalVisible = ref(false);

watch(
  () => visible,
  (newVal) => {
    modalVisible.value = newVal;
  },
  { immediate: true },
);

const closeModal = () => {
  emits('update:visible', false);
};

defineExpose({
  closeModal,
});
</script>

<style></style>
