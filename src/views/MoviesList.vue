<script lang="ts" setup>
import { useGenresStore } from "@/stores/genres";
import { useFetch } from "@/composables/useFetch";
import { API_CONFIG, MOVIE_APIS } from "@/config/api";
import { type IMETADATA, type IMOVIE, type IMOVIES } from "@/lib/definitions";
import {
  computed,
  defineAsyncComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";
const Search = defineAsyncComponent(() => import("@/components/Search.vue"));
const Genres = defineAsyncComponent(() => import("@/components/Genres.vue"));
const ListItem = defineAsyncComponent(
  () => import("@/components/ListItem.vue")
);

const route = useRoute();
const error = ref<string | null>(null);
const loading = ref<boolean>(true);
const movies = ref<IMOVIE[]>([]);
const page = ref<number>(1);
const metaData = ref<IMETADATA>();
const scrollCount = ref<number>(0);
const observer = ref<IntersectionObserver | null>(null);
const scrollTarget = ref<HTMLElement | null>(null);
const loadMore = ref<boolean>(false);
const genresStore = useGenresStore();

const fetchMovies = async () => {
  scrollCount.value = 0;
  movies.value = [];
  page.value = 1;
  loading.value = true;
  const url = route.path.includes("genres")
    ? `${API_CONFIG.BASE_URL}${MOVIE_APIS.GENRES}/${route.params.genreId}/movies?page=${page.value}`
    : `${API_CONFIG.BASE_URL}${MOVIE_APIS.MOVIES}?q=${route.query.q}&page=${page.value}`;
  const fetchMovies = useFetch<IMOVIES>(url);

  try {
    await fetchMovies.fetchData();
    metaData.value = fetchMovies.data.value?.metadata;
    movies.value = fetchMovies.data.value?.data ?? [];
  } catch (err: any) {
    error.value = fetchMovies.error.value;
  } finally {
    loading.value = fetchMovies.loading.value;
  }
};

const hasMoreContent = computed(() => {
  if (metaData.value) {
    return metaData.value?.per_page < metaData.value?.total_count;
  } else {
    return false;
  }
});

const checkGenre = () => {
  const data = genresStore.data?.find(
    (i: { id: number; name: string }) => i.id === Number(route.params.genreId)
  );
  if(data){
    return data
  }else{
    return {id:0,name:" "}
  }
};

onMounted(() => {
  fetchMovies();
});

watch(
  () => route.query.q,
  () => {
    fetchMovies();
  }
);

watch(
  () => route.params.genreId,
  () => {
    fetchMovies();
  }
);

//Load more data if available with observer
const loadMoreData = async () => {
  scrollCount.value += 1;
  page.value += 1;
  loading.value = true;
  const url = route.path.includes("genres")
    ? `${API_CONFIG.BASE_URL}${MOVIE_APIS.GENRES}/${route.params.genreId}/movies?page=${page.value}`
    : `${API_CONFIG.BASE_URL}${MOVIE_APIS.MOVIES}?q=${route.query.q}&page=${page.value}`;
  const fetchMovies = useFetch<IMOVIES>(url);
  try {
    await fetchMovies.fetchData();
    metaData.value = fetchMovies.data.value?.metadata;
    const data = fetchMovies.data.value?.data ?? [];
    movies.value = [...movies.value, ...data];
  } catch (err: any) {
    error.value = fetchMovies.error.value;
  } finally {
    loading.value = fetchMovies.loading.value;
    loadMore.value = false;
  }
};

//setting up and unmounting observer
const setupObserver = () => {
  observer.value = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !loadMore.value && scrollCount.value < 2) {
      loadMore.value = true;
      loadMoreData();
    }
  });
  if (scrollTarget.value) {
    observer.value.observe(scrollTarget.value);
  }
};

onUnmounted(() => {
  if (observer.value && scrollTarget.value) {
    observer.value.unobserve(scrollTarget.value);
  }
});
onUpdated(() => {
  setupObserver();
});
</script>
<template>
  <div class="max-w-screen-xl px-4 flex gap-8 mx-auto flex-col pt-12 w-full">
    <section class="gap-8 mx-auto flex justify-between items-center w-full">
      <RouterLink to="/" class="bg-primary-1000 w-max p-2 rounded-xl">
        <svg width="20" height="20" class="fill-white">
          <use href="/sprite.svg#icon-arrow-left" />
        </svg>
      </RouterLink>
      <div class="flex flex-col justify-center items-center">
        <h2 class="font-bold text-lg">Result</h2>
        <h3 class="opacity-40 text-xs font-light">
          {{ route.params.genreId ? `for "${checkGenre().name}"` : `for "${route.query?.q}"` }}
        </h3>
      </div>
      <span></span>
    </section>
    <section v-if="route.path.includes('genres')" class="w-full flex">
      <Genres :slice="true" />
    </section>
    <section class="flex" v-else>
      <Search />
    </section>
    <section>
      <ul v-if="loading" class="flex flex-col">
        <li v-for="(_, index) in Array(5).fill(null)" :key="index">
          <ListItem
            :movie="{
              id: 0,
              title: '',
              poster: '',
              year: 0,
              director: '',
              country: '',
              imdb_rating: '',
              imdb_votes: '',
              imdb_id: '',
              genres: [],
            }"
            :skeleton="true"
          />
        </li>
      </ul>
      <ul v-else class="flex flex-col">
        <li v-for="movie in movies"><ListItem :movie /></li>
      </ul>
    </section>
    <section
      v-if="hasMoreContent && scrollCount < 2"
      class="w-full flex justify-center items-center"
    >
      <div
        v-if="loadMore"
        class="loading-dots bg-primary-1000 px-4 py-2 h-12 rounded-xl"
      >
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <div
        v-else
        ref="scrollTarget"
        class="bg-primary-1000 px-4 py-2 rounded-xl"
      >
        Load More
      </div>
    </section>
    <section
      v-if="hasMoreContent && scrollCount >= 2"
      class="w-full flex justify-center items-center"
    >
      <button
        @click="loadMoreData"
        class="bg-primary-1000 px-4 py-2 rounded-xl"
      >
        Click For More
      </button>
    </section>
  </div>
</template>
<style></style>
