<template>
  <div>
    <Card>
      <Pick name="Line" :selected-id="line" :selected-name="selectedLineName" :enabled="true">
        <li v-for="option in linesData || []" :key="option.id">
          <RouterLink class="text-blue-800" :to="`/${option.id}`">
            {{ option.text }}
          </RouterLink>
        </li>
      </Pick>
    </Card>

    <Card>
      <div v-if="stationsError">Error {{ JSON.stringify(stationsError) }}</div>
      <Pick
        name="Station"
        :selected-id="station"
        :selected-name="selectedStationName"
        :enabled="!!line"
        :unselect-href="line ? `/${line}` : '/'"
      >
        <li v-for="option in stationsData || []" :key="option.id">
          <RouterLink class="text-blue-800" :to="`/${line}/${option.id}`">
            {{ option.text }}
          </RouterLink>
        </li>
      </Pick>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import { getLinesAsync, getStationsAsync } from '../services/lines-service'
import Card from './Card.vue'
import Pick from './Pick.vue'

const props = defineProps<{
  line?: string
  station?: string
}>()

// Fetch lines
const {
  state: linesData,
  isLoading: linesLoading,
  error: linesError,
} = useAsyncState(getLinesAsync, null, {
  immediate: true,
})

// Fetch stations when line changes
const {
  state: stationsData,
  isLoading: stationsLoading,
  error: stationsError,
  execute: fetchStations,
} = useAsyncState(() => (props.line ? getStationsAsync(props.line) : Promise.resolve([])), null, {
  immediate: false,
})

watch(
  () => props.line,
  (newLine) => {
    if (newLine) {
      fetchStations()
    }
  },
  { immediate: true },
)

const selectedLineName = computed(() => {
  return linesData.value?.find((item) => item.id === props.line)?.text
})

const selectedStationName = computed(() => {
  return stationsData.value?.find((item) => item.id === props.station)?.text
})
</script>
