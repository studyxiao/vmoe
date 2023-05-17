<script setup lang="ts">
useHead({
  title: 'VMoe',
  meta: [
    {
      name: 'description',
      content: 'Opinionated Vite Starter Template from vitesse',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
