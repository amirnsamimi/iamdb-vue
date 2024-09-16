<script setup lang="ts">
import { useFetch } from "@/composables/useFetch";
import { API_CONFIG, MOVIE_APIS } from "@/config/api";
import type { IMOVIE } from "@/lib/definitions";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()

const data = ref<IMOVIE | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);


const fetchMovie = useFetch<IMOVIE>(
  `${API_CONFIG.BASE_URL}${MOVIE_APIS.MOVIES}/${route.params?.movieId}`
);
const loadMovie = async () => {
  loading.value = true;
  error.value = null;
  try {
    await fetchMovie.fetchData();
    console.log(fetchMovie)
    data.value = fetchMovie.data.value;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadMovie();
});
</script>
<template></template>
<style scoped></style>
