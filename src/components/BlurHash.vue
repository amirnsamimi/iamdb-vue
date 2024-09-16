        <script setup lang="ts">
        import { ref, onMounted } from 'vue';
        import { decode } from 'blurhash';
        
        const props = defineProps<{
          src: string,
          blurHash: string,
          width: number,
          height: number,
          alt: string
      }>();
        
        const canvas = ref<HTMLCanvasElement | null>(null);
        const imageLoaded = ref(false);
        
        const drawBlurHash = (blurHash: string, width: number, height: number) => {
          if (!canvas.value) return;
        
          const pixels = decode(blurHash, width, height);
          const ctx = canvas.value.getContext('2d');
        
          if (!ctx) return;
        
          const imageData = ctx.createImageData(width, height);
          imageData.data.set(pixels);
          ctx.putImageData(imageData, 0, 0);
        };
        
        onMounted(() => {
          if (props.blurHash) {
            drawBlurHash(props.blurHash, props.width, props.height);
          }
        });
        
        const onImageLoad = () => {
          imageLoaded.value = true;
        };
        </script>

<template>
    <div class="image-wrapper " :style="{ height: `${height}px`, width: `${width}px`, borderRadius: '20px' }" >
      <canvas ref="canvas" v-if="!imageLoaded" :style="{ height: `${height}px`, width: `${width}px`, borderRadius: '20px' }" :width="width" :height="height" />
      <img
        :src="src"
        @load="onImageLoad"
        :style="{ display: imageLoaded ? 'flex' : 'none', height: `${height}px`, width: `${width}px` }"
        :alt="alt || ' '"
        class='object-cover shrink-0 rounded-xl'
      />
    </div>
  </template>
  
  
  <style scoped>
  .image-wrapper {
    position: relative;
    display: flex;
  }
  
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  

  </style>