import Vue from 'vue'
import Router from 'vue-router'
import NavbarHome from '@/components/NavbarHome'
import NavbarAuthed from '@/components/NavbarAuthed'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import ProfileSetup from '@/components/ProfileSetup'
import NewPost from '@/components/NewPost'
import PostView from '@/components/PostView'
import Api from '@/router/api'

Vue.use(Router)

const auth = (to, from, next) => {
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
      beforeEnter: auth
    },
    {
      path: '/setup-profile',
      name: 'ProfileSetup',
      components: {
        navbar: NavbarAuthed,
        body: ProfileSetup
      },
      beforeEnter: auth
    },
    {
      path: '/post',
      name: 'Post',
      components: {
        navbar: NavbarAuthed,
        body: NewPost
      },
      beforeEnter: auth
    },
    {
      path: '/view-post/:postId',
      name: 'ViewPost',
      components: {
        navbar: NavbarAuthed,
        body: PostView
      },
      beforeEnter: auth
    }
  ]
})
