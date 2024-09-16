import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

export const useFavStore = defineStore("fav", () => {
  const faved = ref<number[]>([]);
  const persistor = () => {
    localStorage.setItem("faved", JSON.stringify(faved.value) || "");
  };
  const toggleFaved = (id: number): void => {
    if (!faved.value.includes(id)) {
      faved.value.push(id);
      persistor();
    } else {
      const toRemove = faved.value.findIndex((i) => i === id);
      faved.value.splice(toRemove, 1);
      persistor();
    }
  };

  const isFaved = (id: number): boolean => faved.value.includes(id);
  onMounted(() => {
    const favPersisted = localStorage.getItem("faved");
    if(favPersisted){
    faved.value = JSON.parse(favPersisted || " ");
  }
  });

  return { faved, isFaved, toggleFaved };
});
