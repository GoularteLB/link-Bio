import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import HomeView from '@/views/HomeView.vue'
import { content, findProject, projectExists } from '@/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'home' } },
    {
      path: '/projeto/:id',
      name: 'projeto',
      component: () => import('@/views/ProjectView.vue'),
      beforeEnter: (to) =>
        projectExists(String(to.params.id))
          ? true
          : { name: 'not-found', params: { pathMatch: to.path.slice(1).split('/') } },
    },
    {
      path: '/links',
      name: 'links',
      component: () => import('@/views/LinksView.vue'),
      meta: { title: 'links' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'notFound' },
    },
  ],
  scrollBehavior: () => false,
})

function applyTitle(route) {
  if (!route) return

  if (route.name === 'projeto') {
    const project = findProject(String(route.params.id))
    document.title = project
      ? `${project.title} | ${content.value.profile.name}`
      : content.value.meta.home
    return
  }

  const key = route.meta?.title
  if (key) document.title = content.value.meta[key]
}

router.afterEach(applyTitle)
watch(content, () => applyTitle(router.currentRoute.value))

export default router
