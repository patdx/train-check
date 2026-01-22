<template>
  <div>
    <h1>{{ name }}</h1>
    <table class="my-2 w-full">
      <tbody>
        <Train v-for="train in data" :key="train.no" :data="train" />
      </tbody>
    </table>
    <div v-if="data.length === 0">No trains</div>
  </div>
</template>

<script setup lang="ts">
import type { TrainModel } from '../types/train-model'
import Train from './Train.vue'

defineProps<{
  name: string
  data: TrainModel[]
}>()
</script>
