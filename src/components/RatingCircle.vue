<script setup lang="ts">
import { computed, toRefs } from "vue";

const props = defineProps<{ rating: number }>();
const { rating } = toRefs(props);
const circleStyle = computed(() => {
  const ratingPercent = (rating.value / 10) * 100;
  return {
    background: `conic-gradient(
            #724CF9 0% ${ratingPercent}%, 
            #222C4F ${ratingPercent}% 100%
          )`,
  };
});
</script>

<template>
  <div class="rating-circle" :style="circleStyle">
    <div class="rating-cover"></div>
    <div class="rating-text">{{ rating }}</div>
  </div>
</template>

<style scoped>
.rating-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.rating-cover {
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border-radius: 100px;
  width: 65px;
  height: 65px;
  background-color: #070d23;
}
.rating-text {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border-radius: 100px;
  width: 80px;
  font-size: 24px;
  height: 80px;
  color: white;
  font-weight: bold;
}
</style>
