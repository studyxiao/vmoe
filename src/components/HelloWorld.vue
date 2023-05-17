<script setup lang="ts">
import { debounceFilter } from '@vueuse/core'

defineProps<{ msg: string }>()

const counter = useCounterStore()

const mouse = useMouse({ eventFilter: debounceFilter(100) })
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo">
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="/src/assets/vue.svg" class="logo vue" alt="Vue logo">
    </a>
    <a href="https://github.com/antfu/vitesse" target="_blank">
      <img src="/favicon.svg" class="logo vitesse" alt="Vitesse logo">
    </a>
  </div>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="counter.count++">
      count is {{ counter.count }}
    </button>
    <button type="button" style="margin-left:2em; min-width: 8em;" @click="toggleDark()">
      {{ isDark }}
    </button>
    <p>
      Mouse Position: X: {{ mouse.x }}, Y:{{ mouse.y }}
    </p>
  </div>

  <p class="read-the-docs">
    Click on logos to learn more
  </p>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
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
.read-the-docs {
  color: #888;
}
</style>
