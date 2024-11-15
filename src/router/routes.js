const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('src/pages/OverviewPage.vue') },
      { path: '/overview', component: () => import('src/pages/OverviewPage.vue') },
      { path: 'addMeal', component: () => import('src/pages/AddMealPage.vue') },
      { path: 'selectMeal', component: () => import('src/pages/MealSelectionPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFoundPage.vue')
  }
]

export default routes
