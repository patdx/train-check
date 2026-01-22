<template>
  <div v-if="error">error occurred</div>
  <LoadingIcon v-else-if="loading" />
  <div v-else>
    <Card>
      <Trains name="Northbound" :data="data?.trainsUp || []" />
    </Card>
    <Card>
      <Trains name="Southbound" :data="data?.trainsDown || []" />
    </Card>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { getTrainsAsync } from '../services/lines-service'
import Card from './Card.vue'
import Trains from './Trains.vue'
import LoadingIcon from './LoadingIcon.vue'

const props = defineProps<{
  line: string
  station: string
}>()

const {
  state: data,
  isLoading: loading,
  error,
  execute: fetchTrains,
} = useAsyncState(() => getTrainsAsync(props.line, props.station), null, {
  immediate: true,
  resetOnExecute: true,
})

watch([() => props.line, () => props.station], () => {
  if (props.line && props.station) {
    fetchTrains()
  }
})
</script>
