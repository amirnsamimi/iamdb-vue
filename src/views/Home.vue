<script setup lang="ts">
import Search from "@/components/search.vue";
import Genres from "@/components/genres.vue";
</script>
<template>
  <section
    class="max-w-screen-xl gap-8 mx-auto flex flex-col items-center justify-center min-h-screen"
  >
    <h1 class="text-[6rem] md:text-[9rem] font-black text-primary">IAMDb</h1>
    <div class="px-4 w-full flex">
      <Search />
    </div>
    <div class="w-full px-4">
      <Genres />
    </div>
  </section>
</template>
