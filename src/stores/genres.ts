import { useFetch } from "@/composables/useFetch"
import { API_CONFIG, MOVIE_APIS } from "@/config/api"
import type { IGENRES } from "@/lib/definitions"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useGenresStore = defineStore('genres',()=>{

    const data = ref<IGENRES[] | null>(null)
    const loading = ref<boolean>(false)
    const error = ref<string | null>(null)
  
    const fetchGenres = useFetch<IGENRES[]>(`${API_CONFIG.BASE_URL}${MOVIE_APIS.GENRES}`)
    const loadGenres = async () => {
      loading.value = true
      error.value = null
      try {
        await fetchGenres.fetchData()
        data.value = fetchGenres.data.value
      } catch (err: any) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }
   
    loadGenres()

return {data,loading,error}
})