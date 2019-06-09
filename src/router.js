import Vue from 'vue'
import Router from 'vue-router'

const Artwork = (resolve) => {
  import(/* webpackChunkName: "artwork" */ './views/artwork.vue').then((module) => {
    resolve(module)
  })
}

const Edit = (resolve) => {
  import(/* webpackChunkName: "edit" */ './views/edit.vue').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/artwork'
    },
    {
      path: '/artwork',
      name: 'artwork',
      component: Artwork
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
