import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue'

const pages = [
  {
    path: '/login',
    component: defineAsyncComponent(() => import('@/components/MyLogin/MyLogin.vue')),
  },
  {
    path: '/monitor/',
    component: defineAsyncComponent(() => import('@/components/MyMonitor/MyMonitor.vue')),
  },
  {
    path: '/monitor-control/',
    component: defineAsyncComponent(() => import('@/components/MyMonitor/MyMonitor.vue')),
  },
  {
    path: '/funnel/',
    component: defineAsyncComponent(() => import('@/components/MyMonitor/MyMonitor.vue')),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: pages,
});
