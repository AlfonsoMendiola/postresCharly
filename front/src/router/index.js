import { createRouter, createWebHistory } from 'vue-router'
import { useUsuarioStore } from '../stores/user';
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/menu.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/productos.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/usuarios.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: () => import('../views/ventas.vue'),
      meta: {requiresAuth: true}
    },
  ]
})

router.beforeEach((to, from, next) => {
  const usuarioState = useUsuarioStore()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (!usuarioState.getToken) {
      next({ path: '/' })
    } else {
      next()
    }

  } else { next() }
});

export default router
