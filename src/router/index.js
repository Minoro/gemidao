import Vue from 'vue'
import Router from 'vue-router'
import Recorder from '@/components/Recorder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Recorder',
      component: Recorder
    }
  ]
})
