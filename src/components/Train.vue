<template>
  <tr>
    <td class="w-1/4 text-center">{{ data.type }} to {{ data.boundFor }}</td>
    <td class="w-1/4 text-center">{{ data.delayStatus }}</td>
    <td class="w-1/4 text-center">{{ data.nowPosition }}</td>
    <td class="w-1/4 text-center">
      <TrainTicker :stations-away="Number(data.stationsAway)" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { TrainModel } from '../types/train-model'
import TrainTicker from './TrainTicker.vue'

const props = defineProps<{
  data: TrainModel
}>()
</script>
