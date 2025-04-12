<script setup lang="ts">
import type { Component } from 'vue';
import type { Stringable } from '@/helpers';

defineProps<{
  title: string;
  value?: Stringable;
  icon: Component;
}>();
</script>

<template>
  <section class="flex-1 px-6 py-4 rounded-2xl shadow-xl shadow-input">
    <div class="flex items-center gap-2">
      <component :is="icon" class="fill-primary" />
      <div>
        <h2>{{ title }}</h2>
        <p class="text-3xl">{{ value }}</p>
      </div>
    </div>

    <slot></slot>
  </section>
</template>
