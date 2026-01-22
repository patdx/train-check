<template>
  <div>
    <div class="sticky top-0 bg-white shadow-sm">
      <div class="nav-container mx-auto max-w-2xl">
        <RouterLink to="/" class="mr-auto block text-blue-800 transition-transform hover:scale-105">
          <h1
            class="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 bg-clip-text p-2 text-5xl font-extrabold text-transparent tracking-tight drop-shadow-sm transition-all duration-300 hover:from-blue-500 hover:via-blue-400 hover:to-indigo-500 hover:drop-shadow-md"
          >
            Train Check
          </h1>
        </RouterLink>
      </div>
    </div>
    <!-- TODO: figure out why this does not align to the center of the page quite exactly -->
    <div class="mx-auto max-w-2xl p-2">
      <LineStationPicker :line="line" :station="station" />
      <StationInfo v-if="line && station" :line="line" :station="station" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import LineStationPicker from './LineStationPicker.vue'
import StationInfo from './StationInfo.vue'

const route = useRoute()

const line = computed(() => route.params.line as string | undefined)
const station = computed(() => route.params.station as string | undefined)
</script>
