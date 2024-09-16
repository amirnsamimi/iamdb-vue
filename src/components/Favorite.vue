<script setup lang="ts">
import { useFavStore } from "@/stores/fav";

defineProps<{id:number,bar?:boolean}>();

const favStore = useFavStore();

</script>
<template>
    <button v-if="bar ?? false" @click.self="id && favStore.toggleFaved(id)"   :class="[ id && favStore.isFaved(id) ? 'fixed bottom-4 right-0 left-0 z-10 rounded-xl flex justify-center items-center px-4 py-4 mx-4 bg-primary-1000' : 'fixed bottom-4 right-0 left-0 z-10 rounded-xl flex justify-center items-center px-4 py-4 mx-4 bg-accent-1000',]">
{{id && favStore.isFaved(id) ?   'Remove From Favorite' : 'Add To Favorite'}}
  </button>
  <button v-else @click.stop="id && favStore.toggleFaved(id)">
    <svg width="24" height="24">
      <use
        href="/sprite.svg#icon-heart"
        :class="[
          id && favStore.isFaved(id)
            ? 'fill-accent-1000'
            : 'stroke-white fill-none',
        ]"
      />
    </svg>
  </button>



</template>
<style scoped></style>
