import { createRouter, createWebHistory } from 'vue-router'
import {authService} from '../services/authService'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {requiresGuest: true},
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {requiresGuest: true},
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {requiresAuth: true},
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {requiresAuth: true},

  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/UserView.vue'),
    meta: {requiresAuth: true},
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const isAuthenticated = authService.isLogin();

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { 
      name: 'login',  
    };
  }

  if (to.meta.requiresGuest && isAuthenticated) {
    return { name: 'dashboard' };
  }

  return true;
});

export default router