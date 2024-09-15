<script setup lang="ts">
import { useFavStore } from "@/stores/fav";

defineProps({
  id: {
    type: Number,
  },
});

const favStore = useFavStore();
</script>
<template>
  <button @click="id && favStore.toggleFaved(id)">
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
