<template>
  <svg viewBox="0 0 140 35" :style="{ maxHeight: '1em' }">
    <rect class="fill-red-500" y="0" :x="rectPosition" height="10" width="20" />
    <circle class="fill-orange-400" r="10" cy="25" cx="10" />
    <circle class="fill-orange-400" r="10" cy="25" cx="50" />
    <circle class="fill-orange-400" r="10" cy="25" cx="90" />
    <circle class="fill-blue-400" r="10" cy="25" cx="130" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  stationsAway: number
}>()

const rectPosition = computed(() => 120 - props.stationsAway * 40)
</script>
