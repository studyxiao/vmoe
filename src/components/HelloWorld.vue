<script setup lang="ts">
import { debounceFilter } from '@vueuse/core'

defineProps<{ msg: string }>()

const counter = useCounterStore()

const mouse = useMouse({ eventFilter: debounceFilter(100) })
</script>

<template>
  <div class=" flex place-content-center min-h-screen flex-col text-center">
    <div class="flex mx-auto">
      <a class=" text-4xl hover:animate-bounce" href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo">
      </a>
      <a class=" text-4xl hover:animate-spin" href="https://vuejs.org/" target="_blank">
        <img src="/src/assets/icons/vue.svg" class="logo vue" alt="Vue logo">
      </a>
      <a class=" text-4xl hover:animate-pulse" href="https://github.com/antfu/vitesse" target="_blank">
        <img v-if="isDark" src="/favicon-dark.svg" class="logo vitesse" alt="Vitesse logo">
        <img v-else src="/favicon.svg" class="logo vitesse" alt="Vitesse logo">
      </a>
    </div>
    <h1 class=" text-4xl mt-10">
      {{ msg }}
    </h1>

    <div class="mt-10 space-x-2">
      <button
        type="button" class="rounded bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-100"
        @click="counter.count++"
      >
        count is {{ counter.count }}
      </button>
      <button
        type="button" class="rounded bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-100"
        @click="toggleDark()"
      >
        Theme is {{ isDark ? 'Dark' : 'light' }}
      </button>
      <p class="mt-8 text-xl">
        Mouse Position: X: {{ mouse.x }}, Y: {{ mouse.y }}
      </p>
    </div>

    <p class="mt-4 text-gray-400 text-xl">
      Click on logos to learn more
    </p>
    <p class="mt-4 text-gray-600 text-xl">
      Custom svg icons:
      <i-my-icons-vue class=" inline-block" />
      <i-carbon-sun class=" inline-block animate-[spin_10s_ease-in-out_infinite]" />
    </p>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: .5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.logo.vitesse:hover {
  filter: drop-shadow(0 0 2em #222222aa);
}
</style>
