import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('../views/Todos.vue'), 
    },
    {
      path: '/todos/:category',
      name: 'todos-category',
      component: () => import('../views/Todos.vue'),
    },
    {
      path: '/done',
      name: 'done',
      component: () => import('../views/Done.vue'),
    },
    {
      path: '/done/:category',
      name: 'done-category',
      component: () => import('../views/Done.vue'),
    },
    {
      path: '/todo/:TodoId',
      name: 'todo-id',
      component: () => import('../views/TodoID.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

// redirect to / if not authenticated
router.beforeEach(async (to) => {
  const protectedRoutes = ['todos', 'todos-category', 'done', 'done-category', 'todo-id']
  
  if (protectedRoutes.includes(to.name)) {
    const user = await getCurrentUser()
    if (!user) {
      return '/'
    }
  }
})

export default router
