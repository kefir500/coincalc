<script setup lang="ts">
import type { Component } from 'vue';
import type { Stringable } from '@/helpers';

defineProps<{
  heading: string;
  value?: string | Stringable;
  icon: Component;
}>();
</script>

<template>
  <section class="px-6 py-4 rounded-2xl shadow-xl shadow-input">
    <div class="relative flex items-center gap-2">
      <div class="absolute w-10 right-0 h-full bg-linear-to-r from-transparent to-background to-90% pointer-events-none"></div>
      <component :is="icon" class="fill-primary shrink-0" />
      <div class="overflow-hidden">
        <h2>{{ heading }}</h2>
        <p class="text-3xl text-nowrap">{{ value }}</p>
      </div>
    </div>

    <slot></slot>
  </section>
</template>
