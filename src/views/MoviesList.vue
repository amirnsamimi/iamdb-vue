<script lang="ts" setup>
import ListItem from '@/components/listItem.vue';
import Search from '@/components/Search.vue';
import { useFetch } from '@/composables/useFetch';
import { API_CONFIG, MOVIE_APIS } from '@/config/api';
import type { IMOVIE, IMOVIES } from '@/lib/definitions';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const error = ref<string | null>(null)
const loading = ref<boolean>(true)
const movies = ref<IMOVIE[]>()
const page = ref<number>(1)

const fetchMovies = async () => {
  movies.value = []  
  loading.value = true;
  const fetchMovies = useFetch<IMOVIES>(`${API_CONFIG.BASE_URL}${MOVIE_APIS.MOVIES}?q=${route.query.q}&page=${page.value}`);

  try {
    await fetchMovies.fetchData();
    movies.value = fetchMovies.data.value?.data;
  } catch (err: any) {
    error.value = fetchMovies.error.value;
  } finally {
    loading.value = fetchMovies.loading.value;
  }
};

onMounted(() => {
  fetchMovies();
});

watch(() => route.query.q, () => {
  fetchMovies();
});


</script>
<template>
    <div class="max-w-screen-xl px-4 flex gap-8 mx-auto flex-col pt-12 w-full">
<section class=" gap-8 mx-auto flex justify-between items-center w-full">

    <div class="bg-primary-1000 w-max p-2 rounded-xl">
        <svg width="20" height="20" class="fill-white">
            <use href="/sprite.svg#icon-arrow-left" />
        </svg>
    </div>
    <div class="flex flex-col justify-center items-center">
        <h2 class="font-bold text-lg">Result</h2>
        <h3 class="opacity-40 text-xs font-light"> for "{{ route.query?.q }}"</h3>
    </div>
    <span></span>

</section>
<section class=" w-full flex">
    <Search />
</section>
<section>
    <ul class="flex flex-col  ">
       <li v-for="movie in movies"> <ListItem :movie /></li>
    </ul>
</section>  
</div>
</template>
<style>
</style>
