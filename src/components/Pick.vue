<template>
  <div>
    <!-- Selected state with loading -->
    <template v-if="selectedId && enabled">
      <div v-if="loading">
        <h1>{{ name }} <LoadingIcon /></h1>
      </div>
      <div v-else>
        <h1>
          {{ name }}
          <RouterLink :to="unselectHref" class="text-blue-800">
            {{ selectedName }}
          </RouterLink>
        </h1>
      </div>
    </template>

    <!-- Active control (no selection) -->
    <template v-else-if="!selectedId && enabled">
      <div v-if="loading">
        <h1 style="color: red">{{ name }}</h1>
        <ul>
          <li>
            <LoadingIcon />
          </li>
        </ul>
      </div>
      <div v-else>
        <h1 class="text-red-700">{{ name }}</h1>
        <ul class="grid grid-cols-2 gap-2">
          <slot />
        </ul>
      </div>
    </template>

    <!-- Disabled state -->
    <template v-else>
      <div>
        <h1 class="text-gray-500">{{ name }}</h1>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { RouterLink } from 'vue-router'
import LoadingIcon from './LoadingIcon.vue'

const props = withDefaults(
  defineProps<{
    name: string
    selectedId?: string
    selectedName?: string
    enabled: boolean
    unselectHref?: string
  }>(),
  {
    unselectHref: '/',
  },
)

const slots = useSlots()

const loading = computed(() => {
  if (!slots.default) return true
  const slotContent = slots.default()
  return !slotContent || (Array.isArray(slotContent) && slotContent.length === 0)
})
</script>
