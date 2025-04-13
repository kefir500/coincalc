<script setup lang="ts">
import { ref, computed } from 'vue';
import CCPanel from '@/components/CCPanel.vue';
import CCRuler from '@/components/CCRuler.vue';
import CCSelect from '@/components/CCSelect.vue';
import GitHubStar from '@/components/GitHubStar.vue';
import { IconCount, IconHeight, IconMass, IconVolume } from '@/components/icons';
import { currencies, objects } from '@/data';
import { findClosestValues } from '@/helpers';
import type { Coin, ICurrency } from '@/types/currency';

const selectedCurrency = ref<ICurrency>();
const selectedCoin = ref<Coin>();
const sum = ref<number>();

const sumStep = computed(() => Math.max(1, selectedCoin.value?.value ?? 1));

const totalCount = computed(() => selectedCoin.value?.sumToCount(sum.value ?? 0));
const totalHeight = computed(() => selectedCoin.value?.sumToHeight(sum.value ?? 0));
const totalMass = computed(() => selectedCoin.value?.sumToMass(sum.value ?? 0));
const totalVolume = computed(() => selectedCoin.value?.sumToVolume(sum.value ?? 0));

const closestHeights = computed(() => findClosestValues(totalHeight.value?.value ?? 0, objects.heights, (obj) => obj.height.value));
const closestMasses = computed(() => findClosestValues(totalMass.value?.value ?? 0, objects.masses, (obj) => obj.mass.value));

const sortedCurrencies = computed(() => currencies.sort((a, b) => a.country.localeCompare(b.country)));

function reset() {
  selectedCoin.value = undefined;
  sum.value = undefined;
}
</script>

<template>
  <main class="lg:grid grid-cols-3 gap-16 items-center m-auto min-h-screen lg:max-w-6xl px-4 py-16">
    <GitHubStar repo-url="https://github.com/kefir500/coincalc" class="absolute top-4 right-4" />

    <section class="max-w-lg mx-auto my-8 text-center lg:text-left">
      <h1 class="text-4xl font-semibold uppercase mb-4">
        <span class="text-primary">Coin</span>Calc
      </h1>

      <CCSelect v-model="selectedCurrency" placeholder="Select a currency" @change="reset()">
        <option v-for="currency in sortedCurrencies" :key="currency.code" :value="currency" class="text-content">
          {{ currency.title }} ({{ currency.code }})
        </option>
      </CCSelect>

      <CCSelect v-model="selectedCoin" placeholder="Select a coin" :disabled="!selectedCurrency">
        <option v-for="coin in selectedCurrency?.coins" :key="coin.label" :value="coin" class="text-content">
          {{ coin.label }}
        </option>
      </CCSelect>

      <div class="relative">
        <input
          v-model="sum" type="number" id="sum"
          class="peer input !pl-8 pr-4 invalid:!ring-error/50"
          :min="0" :max="10000000000" :step="sumStep" :disabled="!selectedCoin"
          :placeholder="selectedCurrency && `Sum in ${selectedCurrency.code}`"
        />

        <label v-if="selectedCurrency" for="sum" class="absolute top-1/2 left-4 -translate-y-1/2 opacity-40 peer-disabled:opacity-10">
          {{ selectedCurrency?.symbol }}
        </label>
      </div>
    </section>

    <div class="lg:col-span-2">
      <Transition
        enter-active-class="duration-1000"
        enter-from-class="-translate-x-10 opacity-0"
        leave-active-class="hidden">

          <div v-if="sum" class="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
            <CCPanel heading="Coins" :value="totalCount?.toLocaleString() ?? 0" :icon="IconCount" :title="`${totalCount} coin(s)`" />
            <CCPanel heading="Volume" v-if="totalVolume" :value="totalVolume" :icon="IconVolume" :title="totalVolume.toString(false)" />

            <CCPanel v-if="totalHeight" heading="Height" :value="totalHeight" :icon="IconHeight" :title="totalHeight.toString(false)">
              <CCRuler
                :current="totalHeight"
                :start="closestHeights.left && { label: closestHeights.left.title, measurement: closestHeights.left.height, url: closestHeights.left.about }"
                :end="closestHeights.right && { label: closestHeights.right.title, measurement: closestHeights.right.height, url: closestHeights.right.about }"
              />
            </CCPanel>

            <CCPanel v-if="totalMass" heading="Mass" :value="totalMass" :icon="IconMass" :title="totalMass.toString(false)">
              <CCRuler
                :current="totalMass"
                :start="closestMasses.left && { label: closestMasses.left.title, measurement: closestMasses.left.mass, url: closestMasses.left.about }"
                :end="closestMasses.right && { label: closestMasses.right.title, measurement: closestMasses.right.mass, url: closestMasses.right.about }"
              />
            </CCPanel>
          </div>

          <section v-else class="flex flex-col lg:flex-row gap-6 items-center z-0">
            <img src="@/assets/logo.svg" alt="CoinCalc"
              class="w-24 sm:w-32 lg:w-48 drop-shadow-xl animate-[wheel-96_2s_ease] sm:animate-[wheel-128_2s_ease] lg:animate-[wheel-192_2s_ease]" />

            <div>
              <h2 class="text-2xl mb-3 text-center lg:text-left">Ever wondered…</h2>
              <ul class="list-disc pl-8">
                <li>How tall a&nbsp;tower of&nbsp;$10,000 worth of&nbsp;dimes would&nbsp;be?</li>
                <li>Or how much your salary would weigh in&nbsp;pennies?</li>
                <li>Or whether it would reach the&nbsp;Moon?</li>
              </ul>
            </div>
          </section>
      </Transition>
    </div>
  </main>
</template>
