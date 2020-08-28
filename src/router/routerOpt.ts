const router = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'about' */ '../views/About.vue')
  },
  {
    path: '/platform',
    name: 'platform',
    component: () => import(/* webpackChunkName: 'Platform' */ '../views/Platform.vue')
  }
];

export default router;
