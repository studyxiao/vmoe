// import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  return {
    count,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore as any, import.meta.hot))
