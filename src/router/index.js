import Vue from 'vue'
import Router from 'vue-router'
import NavbarHome from '@/components/NavbarHome'
import NavbarAuthed from '@/components/NavbarAuthed'
import HomePage from '@/components/HomePage'
import PostsLatest from '@/components/post-list-views/PostsLatest'
import PostsGeneral from '@/components/post-list-views/PostsGeneral'
import PostsStyling from '@/components/post-list-views/PostsStyling'
import PostsFeedback from '@/components/post-list-views/PostsFeedback'
import PostsProducts from '@/components/post-list-views/PostsProducts'
import PostsRecipes from '@/components/post-list-views/PostsRecipes'
import PostsSearched from '@/components/post-list-views/PostsSearched'
import Profile from '@/components/Profile'
import ProfileEdit from '@/components/ProfileEdit'
import ProfileSetup from '@/components/ProfileSetup'
import NewPost from '@/components/NewPost'
import PostView from '@/components/PostView'
import Api from '@/router/api'
import Footer from '@/components/Footer'

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
        body: HomePage,
        footer: Footer
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      components: {
        navbar: NavbarAuthed,
        body: Profile,
        footer: Footer
      },
      beforeEnter: auth,
      children: [
        {
          path: '',
          component: PostsLatest
        },
        {
          path: 'posts-general',
          name: 'postsGeneral',
          component: PostsGeneral
        },
        {
          path: 'posts-styling',
          name: 'postsStyling',
          component: PostsStyling
        },
        {
          path: 'posts-feedback',
          name: 'postsFeedback',
          component: PostsFeedback
        },
        {
          path: 'posts-products',
          name: 'postsProducts',
          component: PostsProducts
        },
        {
          path: 'posts-recipes',
          name: 'postsRecipes',
          component: PostsRecipes
        },
        {
          path: 'search-results',
          component: PostsSearched
        }
      ]
    },
    {
      path: '/edit-profile',
      name: 'ProfileEdit',
      components: {
        navbar: NavbarAuthed,
        body: ProfileEdit,
        footer: Footer
      },
      beforeEnter: auth
    },
    {
      path: '/setup-profile',
      name: 'ProfileSetup',
      components: {
        navbar: NavbarAuthed,
        body: ProfileSetup,
        footer: Footer
      },
      beforeEnter: (to, from, next) => {
        Api().get('/auth')
          .then((res) => {
            if (res.data.authorized === 'yes') {
              Api().get('/account').then((res) => {
                if (res.data.userLogins > 0) {
                  next('/profile')
                } else {
                  next()
                }
              })
            } else if (res.data.authorized === 'no') {
              next('/')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    {
      path: '/post',
      name: 'Post',
      components: {
        navbar: NavbarAuthed,
        body: NewPost,
        footer: Footer
      },
      beforeEnter: auth
    },
    {
      path: '/view-post/:postId',
      name: 'ViewPost',
      components: {
        navbar: NavbarAuthed,
        body: PostView,
        footer: Footer
      },
      beforeEnter: auth
    }
  ]
})
