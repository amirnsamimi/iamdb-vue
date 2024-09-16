import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('@/views/MoviesList.vue'),
    },
    {
      path:"/movie/:movieId",
     name:'movie',
     component: () => import('@/views/Movie.vue'),
    },
    {
      path: '/genres',
      name: 'genres',
      component: () => import('@/views/MoviesList.vue'),
      children:[
        {
          path:':genreId',
          name:'genreDynamic',
          component: () => import('@/views/MoviesList.vue'),
        }
      ]
    }
  ]
})

export default router
