<script setup lang="ts">
import { computed } from 'vue';
import { getProgress } from '@/helpers';
import type { Measurement } from '@/types/measurement';

export interface IRulerPoint {
  label: string;
  measurement: Measurement;
}

const props = defineProps<{
  current: Measurement;
  start?: IRulerPoint;
  end?: IRulerPoint;
}>();

const offset = computed(() =>
  getProgress(props.current.value, props.start?.measurement.value, props.end?.measurement.value),
);
</script>

<template>
  <div class="relative h-16 bg-linear-to-br from-transparent from-[49.5%] to-primary/40 to-50%">
    <div class="absolute w-2 h-2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-content rounded-full ring-4 ring-content/15 transition-all duration-500"
      :style="{ left: `${offset}%`, bottom: `${offset}%` }">
        <p class="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm/5">
          <span class="text-xs text-nowrap opacity-35">{{ current }}</span>
        </p>
    </div>
  </div>

  <div class="flex justify-between relative mt-1">
    <Transition
      enter-active-class="duration-500"
      enter-from-class="opacity-0"
      leave-active-class="duration-500 absolute"
      leave-to-class="opacity-0">
        <p :key="start?.measurement.value.toString(36)" class="text-sm/5">
          {{ start?.label ?? '−∞' }}<br>
          <span v-if="start" class="text-xs opacity-50">{{ start.measurement }}</span>
        </p>
    </Transition>

    <Transition
      enter-active-class="duration-500"
      enter-from-class="opacity-0"
      leave-active-class="duration-500 absolute right-0"
      leave-to-class="opacity-0">
        <p :key="end?.measurement.value.toString(36)" class="text-sm/5 text-right">
          {{ end?.label ?? '∞' }}<br>
          <span v-if="end" class="text-xs opacity-50">{{ end.measurement }}</span>
        </p>
    </Transition>
  </div>
</template>
