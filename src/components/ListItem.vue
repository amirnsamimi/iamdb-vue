<script lang="ts" setup>
import type { IMOVIE } from "@/lib/definitions";
import Favorite from "@/components/Favorite.vue";
import BlurHash from "./BlurHash.vue";

const props = defineProps<{
  movie: IMOVIE;
  skeleton?: boolean;
}>();

const { id, title, country, genres, poster, imdb_rating, year } = props.movie;
</script>
<template>
  <div v-if="skeleton" class="flex py-4 border-b gap-5 border-primary-1000">
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
  <div v-else  class="flex py-4 border-b gap-5 border-primary-1000">
    <BlurHash
      :src="poster"
      blurHash="LEHLh[WB2yk8pyoJadR*.7kCMdnj"
      :width="125"
      :height="125"
      :alt="`${title}-image`"
    />

    <div class="py-2 grow flex flex-col justify-between h-[125px]">
      <div class="w-full">
        <div class="flex w-full items-center justify-between">
          <div class="sm:text-xl text-2xl font-bold">{{ title }}</div>
          <Favorite :id="id" />
        </div>
        <div>
          <span
            class="text-xs opacity-40 font-ligth"
            v-for="(genre, index) in genres"
            :key='genre'
          >
            {{ index < genres.length - 1 ? genre + ", " : genre + "" }}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-md font-ligth"> {{ year }} </span>
        <span
          class="text-md w-[6px] h-[6px] rounded-full bg-primary-1000"
        ></span>
        <span class="text-md font-ligth"> {{ country }} </span>
        <span
          class="text-md w-[6px] h-[6px] rounded-full bg-primary-1000"
        ></span>
        <div class="flex items-center gap-2">
          <svg width="14" height="14">
            <use href="/sprite.svg#icon-star" />
          </svg>
          <div class="leading-10">{{ imdb_rating }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
