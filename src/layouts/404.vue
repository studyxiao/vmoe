<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <div text-4xl>
      <i-carbon-warning class=" text-xl" />
    </div>
    <RouterView />
    <div>
      <button text-sm btn m="3 t8" @click="router.back()">
        GO Back
      </button>
    </div>
  </main>
</template>
