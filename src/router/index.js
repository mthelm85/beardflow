import Vue from 'vue'
import Router from 'vue-router'
import NavbarHome from '@/components/NavbarHome'
import NavbarAuthed from '@/components/NavbarAuthed'
import Home from '@/components/Home'
import Profile from '@/components/Profile'

import Api from '@/router/api'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        navbar: NavbarHome,
        body: Home
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      components: {
        navbar: NavbarAuthed,
        body: Profile
      },
      beforeEnter: (to, from, next) => {
        Api().get('/auth')
          .then((res) => {
            if (res.data.authorized === 'yes') {
              next()
            } else if (res.data.authorized === 'no') {
              next('/')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  ]
})
