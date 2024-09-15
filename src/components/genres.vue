<script setup lang="ts">
import type { IGENRES } from "@/lib/definitions";
import { useGenresStore } from "@/stores/genres";
import { onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps<{slice?:boolean}>();

const genresStore = useGenresStore();
const genres = ref<IGENRES[] | null>(null);
const limit = ref<number | null>(4);

const adjustLimit = () => {
    limit.value = null
};


const loadGenres = () => {
  const data = genresStore.data;
  if (data) {
    if (limit.value !== null) {
      genres.value = data.slice(0, limit.value);
    } else {
      genres.value = data;
    }
  }
}

watch([genresStore, limit], () => {

  loadGenres()
});

onMounted(()=>{
  loadGenres()
  if(props.slice === true){
    limit.value === null
  }
})
</script>

<template>
  <ul v-if="genres" class="flex flex-wrap justify-center gap-4">
    <li
      class="flex justify-center gap-4"
      v-for="genre in genres"
      :key="genre.id"
    >
      <RouterLink
        :to="`/genres/${genre.id}`"
        class="text-white bg-primary-1000 py-2 px-4 text-nowrap flex flex-wrap items-center justify-center rounded-xl text-xs"
        >{{ genre.name }}</RouterLink
      >
    </li>
    <li v-if="limit !== null">
      <button
        @click="adjustLimit"
        class="text-white bg-primary-1000 py-2 px-4 flex items-center justify-center rounded-xl text-xs"
      >
        Show More
        <svg width="15" height="15" class="fill-white">
          <use href="/sprite.svg#icon-arrow-right" />
        </svg>
      </button>
    </li>
  </ul>
  <ul v-else class="flex gap-4 justify-center">
    <li class="skeleton h-8 w-12 rounded-xl"></li>
    <li class="skeleton h-8 w-12 rounded-xl"></li>
    <li class="skeleton h-8 w-12 rounded-xl"></li>
    <li class="skeleton h-8 w-12 rounded-xl"></li>
    <li class="skeleton h-8 w-12 rounded-xl"></li>
  </ul>
</template>

<style scoped></style>
