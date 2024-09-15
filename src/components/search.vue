<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
// VOICE RECOGNITION
const movieSearchInput = ref<string>('')
const recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const speechRecognition = new recognition()
  speechRecognition.onresult = (event:SpeechRecognitionEvent) => {
    movieSearchInput.value = event.results[0][0].transcript
  }
  speechRecognition.onerror = (event:SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event)
  }
  const startRecognition = () => {
    speechRecognition.start();
  }

  const searchMovie = (event:KeyboardEvent | MouseEvent) => {
    if( event instanceof KeyboardEvent && event.key === 'Enter'){
      router.push(`/${movieSearchInput.value}`)
    }
    if(event instanceof MouseEvent){
      router.push(`/${movieSearchInput.value}`)
    }
  }

  
</script>

<template>

<label class="relative w-full">
<input type="text" @keydown="searchMovie" v-model="movieSearchInput" class="w-full  rounded-2xl p-4 bg-primary-1000  outline-none px-16  " />
<svg width="24" @click="searchMovie" height="24" class=" cursor-pointer absolute fill-white opacity-80 top-0 bottom-0 my-auto left-4">
    <use href="/sprite.svg#icon-search"/>
</svg>

<button @click="startRecognition" class="absolute fill-white opacity-80 border-l-2 border-dark-1000 flex justify-center items-center pl-4  top-0 bottom-0 my-4 right-4">
  <svg width="24" height="24"> 
    <use href="/sprite.svg#icon-mic"/>
</svg>
</button>
</label>
</template>

<style scoped>

</style>