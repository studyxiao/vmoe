<script setup lang="ts">
defineOptions({
  name: 'DemoPage',
})

const bg = ref('https://play.tailwindcss.com/img/beams.jpg')
const source = ref([
  'https://source.unsplash.com/s86WhGhp25Y',
  'https://source.unsplash.com/NoRsyXmHGpI',
  'https://source.unsplash.com/uEFombN3J5U',
  'https://source.unsplash.com/MyVH8UVJDBE',
  'https://source.unsplash.com/IoINVPQe738',

])
</script>

<template>
  <Marquee :bg="bg" :source="source" direction="right" :speed="50" />
  <HelloWorld msg="Vite + Vue + Vitesse" />
</template>
