<script setup lang="ts">
import SelectChevron from '@/components/icons/SelectChevron.vue';

const model = defineModel();

defineProps<{
  placeholder?: string;
}>();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <span class="inline-block w-full relative">
    <select v-model="model" v-bind="$attrs" class="input appearance-none enabled:cursor-pointer !pr-10">
      <option v-if="placeholder" selected disabled hidden :value="undefined">{{ placeholder }}</option>
      <slot></slot>
    </select>
    <SelectChevron class="absolute fill-content/50 right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
  </span>
</template>
