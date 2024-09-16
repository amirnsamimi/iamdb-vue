<script setup lang="ts">
import Favorite from "@/components/Favorite.vue";
import Tags from "@/components/Tags.vue";
import { useFetch } from "@/composables/useFetch";
import { API_CONFIG, MOVIE_APIS } from "@/config/api";
import type { ISINGLEMOVIE } from "@/lib/definitions";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import RatingCircle from "@/components/RatingCircle.vue";

const dataInit = {
  id: 0,
  title: "",
  poster: "",
  year: 0,
  director: "",
  country: "",
  imdb_rating: "",
  runtime: "",
  imdb_votes: "",
  imdb_id: "",
  genres: [""],
  images: [""],
  plot: "",
  rated: "",
  writer: "",
  actor: "",
  language: "",
  awards: "",
  actors: "",
  ratings: "",
};

const route = useRoute();
const ratings = ref<{ Value: string; Source: string }[]>([]);
const data = ref<ISINGLEMOVIE>(dataInit);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

const fetchMovie = useFetch<ISINGLEMOVIE>(
  `${API_CONFIG.BASE_URL}${MOVIE_APIS.MOVIES}/${route.params?.movieId}`
);
const loadMovie = async () => {
  loading.value = true;
  error.value = null;
  try {
    await fetchMovie.fetchData();
    data.value = fetchMovie.data.value ?? dataInit;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

watch(data, () => {
  ratings.value = JSON.parse(data.value.ratings).slice(1);
});

onMounted(() => {
  loadMovie();
});
</script>
<template>
  <div>
    <div class="absolute top-0 left-0 w-full z-0">
      <img
        :src="data.images[0]"
        class="w-full object-cover h-[380px]"
        alt="background-image"
      />
    </div>
    <div
      class="absolute top-0 left-0 h-[380px] w-full bg-gradient-to-t from-dark-1000 to-transparent"
    ></div>
    <div
      class="max-w-screen-xl px-4 flex relative gap-8 mx-auto flex-col pt-12 w-full"
    >
      <section
        class="gap-8 mb-20 mx-auto flex justify-between items-center w-full"
      >
        <RouterLink to="/" class="bg-primary-1000 w-max p-2 rounded-xl">
          <svg width="20" height="20" class="fill-white">
            <use href="/sprite.svg#icon-arrow-left" />
          </svg>
        </RouterLink>
      </section>
      <div class="flex flex-col md:flex-row md:gap-16">
        <div
          class="flex md:flex-col py-4 w-full md:w-3/12 gap-5 order-2 flex-col-reverse md:order-none"
        >
          <section>
            <img :src="data.poster" class="w-full rounded-xl" alt="" />
          </section>
          <section
            class="flex w-full gap-4 flex-wrap h-max content-start grow justify-between opacity-80"
          >
            <RatingCircle :rating="Number(data.imdb_rating)" />
            <div>
              <h2>
                {{ data.imdb_votes }}
              </h2>
              <p class="opacity-60">ratings on IMDB</p>
            </div>
            <div class="opacity-50 text-xs h-max leading-6 flex flex-col">
              <div v-for="rates in ratings">
                {{ rates.Value }} {{ rates.Source }}
              </div>
            </div>
          </section>
        </div>
        <div class="w-full md:w-8/12">
          <section>
            <div class="flex py-4 gap-5">
              <div class="py-2 grow flex flex-col justify-between">
                <div class="w-full flex flex-col gap-4">
                  <div class="flex w-full items-center justify-between">
                    <h1 class="text-5xl font-bold">{{ data.title }}</h1>
                    <span class="hidden z-10 md:flex"
                      ><Favorite :id="data.id"
                    /></span>
                    <span class="flex z-10 md:hidden"
                      ><Favorite bar :id="data.id"
                    /></span>
                  </div>
                  <div>
                    <span
                      class="text-xs opacity-40 font-ligth"
                      v-for="(genre, index) in data.genres"
                      :key="genre"
                    >
                      {{
                        index < data.genres.length - 1
                          ? genre + ", "
                          : genre + ""
                      }}
                    </span>
                  </div>
                  <p
                    style="word-spacing: 0.25rem"
                    class="leading-6 text-white text-opacity-80 text-sm"
                  >
                    {{ data.plot }}
                  </p>
                  <div class="flex gap-3">
                    <Tags :text="data.rated" /> <Tags :text="data.year" />
                    <Tags
                      :icon="{ src: 'icon-time', width: '14', height: '14' }"
                      :text="data.runtime"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            class="gap-8 mb-20 mx-auto flex-col justify-between items-start w-full hidden md:flex"
          >
            <h2 class="font-bold text-[1.75rem]">Details</h2>
            <ul
              class="divide-y opacity-80 divide-primary-1000 flex w-full flex-col"
            >
              <li class="flex py-4">
                <h3 class="font-bold shrink-0 w-[150px]">Directors</h3>
                <p class="grow opacity-60">{{ data.director }}</p>
              </li>
              <li class="flex py-4">
                <h3 class="font-bold shrink-0 w-[150px]">Writers</h3>
                <p class="grow opacity-60">{{ data.writer }}</p>
              </li>
              <li class="flex py-4">
                <h3 class="font-bold shrink-0 w-[150px]">Actors</h3>
                <p class="grow opacity-60">{{ data.actors }}</p>
              </li>
              <li class="flex py-4">
                <h3 class="font-bold shrink-0 w-[150px]">Country</h3>
                <p class="grow opacity-60">{{ data.country }}</p>
              </li>
              <li class="flex py-4">
                <h3 class="font-bold shrink-0 w-[150px]">Language</h3>
                <p class="grow opacity-60">{{ data.language }}</p>
              </li>
              <li class="flex py-4">
                <h3 class="font-bold shrink-0 w-[150px]">Awards</h3>
                <p class="grow opacity-60">{{ data.awards }}</p>
              </li>
            </ul>
          </section>
        </div>
        <section
          class="gap-8 mb-20 mx-auto flex flex-col justify-between items-start w-full md:hidden order-4"
        >
          <h2 class="font-bold text-[1.75rem]">Details</h2>
          <ul
            class="divide-y opacity-80 divide-primary-1000 flex w-full flex-col"
          >
            <li class="flex py-4">
              <h3 class="font-bold shrink-0 w-[150px]">Directors</h3>
              <p class="grow opacity-60">{{ data.director }}</p>
            </li>
            <li class="flex py-4">
              <h3 class="font-bold shrink-0 w-[150px]">Writers</h3>
              <p class="grow opacity-60">{{ data.writer }}</p>
            </li>
            <li class="flex py-4">
              <h3 class="font-bold shrink-0 w-[150px]">Actors</h3>
              <p class="grow opacity-60">{{ data.actors }}</p>
            </li>
            <li class="flex py-4">
              <h3 class="font-bold shrink-0 w-[150px]">Country</h3>
              <p class="grow opacity-60">{{ data.country }}</p>
            </li>
            <li class="flex py-4">
              <h3 class="font-bold shrink-0 w-[150px]">Language</h3>
              <p class="grow opacity-60">{{ data.language }}</p>
            </li>
            <li class="flex py-4">
              <h3 class="font-bold shrink-0 w-[150px]">Awards</h3>
              <p class="grow opacity-60">{{ data.awards }}</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

<!-- 
<BlurHash
:src="data.poster"
blurHash="LEHLh[WB2yk8pyoJadR*.7kCMdnj"
:width="1"
:height="125"
:alt="`${data.title}-image`"
/> -->
<!-- 
<div v-if="loading"
class="max-w-screen-xl px-4 flex relative gap-8 mx-auto flex-col pt-12 w-full"
>
 <section class="gap-8 mb-20 mx-auto flex justify-between items-center w-full">
  <RouterLink to="/" class="bg-primary-1000 w-max p-2 rounded-xl">
    <svg width="20" height="20" class="fill-white">
      <use href="/sprite.svg#icon-arrow-left" />
    </svg>
  </RouterLink>
</section>
 <div  class="flex py-4 border-b gap-5 border-primary-1000">
<div  class="skeleton w-[125px] h-[125px] rounded-md">

</div>
<div class="py-2 grow flex flex-col justify-between h-[125px]">
  <div class="w-full">
    <div class="flex w-full items-center justify-between">
      <div class="skeleton w-1/2 h-6 rounded-md"></div>
      <div class="skeleton w-8 h-8 rounded-md"></div>
    </div>
    <div>
      <span class="skeleton w-1/6 h-6 rounded-md"> </span>
    </div>
  </div>
  <div class="flex items-center gap-3">
    <span class="skeleton w-1/12 h-6 rounded-md"> </span>
    <span
      class="text-md w-[6px] h-[6px] rounded-full bg-primary-1000"
    ></span>
    <span class="skeleton w-1/12 h-6 rounded-md"> </span>
    <span
      class="text-md w-[6px] h-[6px] rounded-full bg-primary-1000"
    ></span>
    <div class="skeleton w-1/12 h-6 rounded-md"></div>
  </div>
</div>
</div>
</div> -->
