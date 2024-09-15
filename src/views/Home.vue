<script setup lang="ts">
import Genres from "@/components/Genres.vue";
import Search from "@/components/Search.vue";
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
