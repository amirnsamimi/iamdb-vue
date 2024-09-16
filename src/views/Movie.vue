<script setup lang="ts">
import Favorite from "@/components/Favorite.vue";
import Tags from "@/components/Tags.vue";
import { useFetch } from "@/composables/useFetch";
import { API_CONFIG, MOVIE_APIS } from "@/config/api";
import type { ISINGLEMOVIE } from "@/lib/definitions";
import { onMounted, ref, watch } from "vue";
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
  <div v-if="loading">
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
            <div class="w-full skeleton rounded-xl h-[400px]"></div>
          </section>
          <section
            class="flex w-full gap-4 flex-wrap h-max content-start grow justify-between opacity-80"
          >
            <div class="skeleton w-[80px] h-[80px] rounded-full"></div>
            <div class="flex flex-col gap-4">
              <h2 class="skeleton w-[120px] h-[24px] rounded-xl"></h2>
              <p class="skeleton w-[120px] h-[24px] rounded-xl"></p>
            </div>
            <div class="text-xs h-max leading-6 gap-4 flex flex-col">
              <p class="skeleton w-[120px] h-[24px] rounded-xl"></p>
              <p class="skeleton w-[120px] h-[24px] rounded-xl"></p>
            </div>
          </section>
        </div>
        <div class="w-full md:w-8/12">
          <section>
            <div class="flex py-4 gap-5">
              <div class="py-2 grow flex flex-col justify-between">
                <div class="w-full flex flex-col gap-4">
                  <div class="flex w-full items-center justify-between">
                    <h1 class="h-[4rem] w-2/3 rounded-xl skeleton"></h1>
           

                  </div>
                  <div class="flex gap-4">
                  
                    <span
                      class="skeleton w-[100px] h-8 rounded-xl text-xs font-ligth"
                    >
                    </span>
                    <span
                      class="skeleton w-[100px] h-8 rounded-xl text-xs font-ligth"
                    >
                    </span>
                  </div>
                  <p
                    style="word-spacing: 0.25rem"
                    class="leading-6 text-white  skeleton w-full h-[24px] rounded-xl  text-sm"
                  >
                   
                  </p>
                  <p
                    style="word-spacing: 0.25rem"
                    class="leading-6 text-white  skeleton w-full h-[24px] rounded-xl  text-sm"
                  >
                   
                  </p>     <p
                    style="word-spacing: 0.25rem"
                    class="leading-6 text-white  skeleton w-1/2 h-[24px] rounded-xl  text-sm"
                  >
                   
                  </p>
                  <div class="flex gap-3">
                    <span
                      class="skeleton w-[70px] h-8 rounded-xl text-xs font-ligth"
                    >
                    </span>
                    <span
                      class="skeleton w-[70px] h-8 rounded-xl text-xs font-ligth"
                    >
                    </span>
                    <span
                      class="skeleton w-[70px] h-8 rounded-xl text-xs font-ligth"
                    >
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            class="gap-8 mb-20 mx-auto flex-col justify-between items-start w-full hidden md:flex"
          >
          <h2 class="h-[2rem] w-[100px] rounded-xl skeleton"></h2>
            <ul
              class="divide-y  divide-primary-1000 flex w-full flex-col"
            >
              <li class="flex py-4 gap-4">
                <h3 class="font-bold shrink-0 skeleton w-[150px] h-[1.5rem] rounded-xl"></h3>
                <p class="grow skeleton h-[1.5rem] rounded-xl opacity-60"></p>
              </li>
            <li class="flex py-4 gap-4">
                <h3 class="ffont-bold shrink-0 skeleton w-[150px] h-[1.5rem] rounded-xl"></h3>
                <p class="grow skeleton h-[1.5rem] rounded-xl opacity-60"></p>              </li>
            <li class="flex py-4 gap-4">
                <h3 class="font-bold shrink-0 skeleton w-[150px] h-[1.5rem] rounded-xl"></h3>
                <p class="grow skeleton h-[1.5rem] rounded-xl opacity-60"></p>              </li>
            <li class="flex py-4 gap-4">
                <h3 class="font-bold shrink-0 skeleton w-[150px] h-[1.5rem] rounded-xl"></h3>
                <p class="grow skeleton h-[1.5rem] rounded-xl opacity-60"></p>              </li>
            <li class="flex py-4 gap-4">
                <h3 class="font-bold shrink-0 skeleton w-[150px] h-[1.5rem] rounded-xl"></h3>
                <p class="grow skeleton h-[1.5rem] rounded-xl opacity-60"></p>              </li>
            <li class="flex py-4 gap-4">
                <h3 class="font-bold shrink-0 skeleton w-[150px] h-[1.5rem] rounded-xl"></h3>
                <p class="grow skeleton h-[1.5rem] rounded-xl opacity-60"></p>              </li>
            </ul>
          </section>
        </div>
        <section
          class="gap-8 mb-20 mx-auto flex flex-col justify-between items-start w-full md:hidden order-4"
        >
        <h2 class="h-[2rem] w-[100px] rounded-xl skeleton"></h2>
            <ul
              class="divide-y  divide-primary-1000 flex w-full flex-col"
            >
              <li class="flex py-4 gap-4">
                <h3 class="font-bold shrink-0 skeleton w-[150px] h-[1.5rem] rounded-xl"></h3>
                <p class="grow skeleton h-[1.5rem] rounded-xl opacity-60"></p>
              </li>
            <li class="flex py-4 gap-4">
                <h3 class="ffont-bold shrink-0 skeleton w-[150px] h-[1.5rem] rounded-xl"></h3>
                <p class="grow skeleton h-[1.5rem] rounded-xl opacity-60"></p>              </li>
            <li class="flex py-4 gap-4">
                <h3 class="font-bold shrink-0 skeleton w-[150px] h-[1.5rem] rounded-xl"></h3>
                <p class="grow skeleton h-[1.5rem] rounded-xl opacity-60"></p>              </li>
            <li class="flex py-4 gap-4">
                <h3 class="font-bold shrink-0 skeleton w-[150px] h-[1.5rem] rounded-xl"></h3>
                <p class="grow skeleton h-[1.5rem] rounded-xl opacity-60"></p>              </li>
            <li class="flex py-4 gap-4">
                <h3 class="font-bold shrink-0 skeleton w-[150px] h-[1.5rem] rounded-xl"></h3>
                <p class="grow skeleton h-[1.5rem] rounded-xl opacity-60"></p>              </li>
            <li class="flex py-4 gap-4">
                <h3 class="font-bold shrink-0 skeleton w-[150px] h-[1.5rem] rounded-xl"></h3>
                <p class="grow skeleton h-[1.5rem] rounded-xl opacity-60"></p>              </li>
            </ul>
        </section>
      </div>
    </div>
  </div>
  <div v-else>
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
