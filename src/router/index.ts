import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/podcast',
      name: 'podcast',
      component: () => import('../views/PodcastView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    }
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    
    // Handle hash links (e.g., #blog, #podcast)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // Adjust based on your header height
      };
    }

    // For specific routes, scroll to top with offset
    if (to.path === '/blog' || to.path === '/podcast') {
      return {
        top: 80, // Add offset to account for fixed header
        behavior: 'smooth'
      };
    }

    return { top: 0, behavior: 'smooth' };
  }
});

export default router; 