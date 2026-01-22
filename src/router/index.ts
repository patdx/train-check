import { createRouter, createWebHistory } from 'vue-router'
import MainApp from '../components/MainApp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainApp,
    },
    {
      path: '/:line',
      name: 'line',
      component: MainApp,
    },
    {
      path: '/:line/:station',
      name: 'station',
      component: MainApp,
    },
  ],
})

export default router
