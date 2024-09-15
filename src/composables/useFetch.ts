import { ref } from 'vue'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    const response = await fetch(url)
    if (!response.ok) {
      error.value = 'Failed to fetch data'
    }else{
      const result: T = await response.json()
      data.value = result
    }
    loading.value = false
  }
  
  return { data, loading, error, fetchData }
}