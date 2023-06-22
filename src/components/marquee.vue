<script setup lang="ts">
// https://play.tailwindcss.com/alDCOx6PU2
type Direction = 'left' | 'right'
const props = defineProps({
  bg: {
    type: String,
    default: '',
  },
  source: {
    type: Array<string>,
    required: true,
    default: () => [],
  },
  direction: {
    type: String as PropType<Direction>,
    default: 'left',
  },
  speed: {
    type: Number,
    default: 50,
  },
})

const direction_style = computed(() => {
  switch (props.direction) {
    case 'left':
      return 'normal'
    case 'right':
      return 'reverse'
    default:
      return 'normal'
  }
})

const speed_style = computed(() => {
  return `${props.speed}s`
})
</script>

<template>
  <div class="relative flex justify-center overflow-hidden">
    <img v-if="bg" :src="bg" alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2">

    <div class="pointer-events-none relative flex gap-4 overflow-hidden">
      <div class="m-animate-marquee flex min-w-full shrink-0 items-center justify-around gap-4">
        <img v-for="item in source" :key="item" class="aspect-square max-w-[clamp(10rem,28vmin,20rem)] rounded-md object-cover shadow-md" :src="item" alt="">
      </div>
      <div aria-hidden="true" class="m-animate-marquee flex min-w-full shrink-0 items-center justify-around gap-4">
        <img v-for="item in source" :key="item" class="aspect-square max-w-[clamp(10rem,28vmin,20rem)] rounded-md object-cover shadow-md" :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - 1px));
  }
}

.m-animate-marquee {
  animation: marquee v-bind(speed_style) linear infinite;
  animation-direction: v-bind(direction_style);
}
</style>
