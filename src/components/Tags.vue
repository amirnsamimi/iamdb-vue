<script setup lang="ts">
defineProps<{text:string | number,icon?:{width:string,height:string,src:string}}>()
</script>
<template>
  <div
    class="text-white bg-primary-1000 py-2 px-4 gap-2 text-nowrap flex flex-wrap items-center justify-center rounded-xl text-xs"
  >

  <svg v-if="icon" :width="icon.width" :height="icon.height" > <use :href="`/sprite.svg#${icon.src}`" />  </svg> {{ text }}
  </div>
</template>
<style scoped></style>
