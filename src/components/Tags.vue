<script setup lang="ts">
defineProps<{text:string}>()
</script>
<template>
  <div
    class="text-white bg-primary-1000 py-2 px-4 text-nowrap flex flex-wrap items-center justify-center rounded-xl text-xs"
  >
{{ text }}
  </div>
</template>
<style scoped></style>
