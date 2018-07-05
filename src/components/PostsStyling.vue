<template lang="html">
  <div class="card shadow">
    <p class="card-header bg-dark text-white text-center">Styling & Grooming</p>
    <div class="list-group list-group-flush">
      <router-link v-for="post in posts" :key="post._id" :to="{ name: 'ViewPost', params: { postId: post._id } }" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ post.title }}
            <img src="../assets/beard-black.svg"
              v-if="recommended(post.keywords)"
              width="30px"
              v-b-popover.hover="'This post is recommended just for you, based on past posts that you have liked.'"
              title="Recommended for you"/>
          </h5>
          <small class="text-right">{{ post.date | relativeTime }}</small>
        </div>
        <p class="mb-1">{{ `${post.text.substring(0, 70).trim()}...` }}</p>
        <b-img :src="post.userPic" rounded="circle" width="40" class="ml-2 img-cropped"></b-img>
        <small>By {{ post.user }}</small>
        <span class="badge badge-secondary float-right mt-2 mr-1">{{ post.keywords[0] }}</span>
        <span class="badge badge-secondary float-right mt-2 mr-1">{{ post.keywords[1] }}</span>
        <span class="badge badge-secondary float-right mt-2 mr-1">{{ post.keywords[2] }}</span>
      </router-link>
    </div>
    <div class="card-footer">
      <router-link to="/post" class="btn btn-warning btn-sm">Post your own story</router-link>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
import { getUserInfo } from '@/mixins/getUserInfo'
import Moment from 'moment'
export default {
  data () {
    return {
      posts: []
    }
  },

  created () {
    Api().get('/get-posts-categorized', {
      params: {
        category: 'styling'
      }
    })
      .then((res) => {
        if (res.data.length < 5) {
          let i = 0
          for (i = 0; i < res.data.length; i++) {
            this.posts.push(res.data[i])
          }
        } else {
          let i = 0
          for (i = 0; i < 5; i++) {
            this.posts.push(res.data[i])
          }
        }
      })
      .catch((err) => {
        alert(err)
      })
  },

  filters: {
    relativeTime (date) {
      return Moment(date).fromNow()
    }
  },

  methods: {
    recommended (keywords) {
      let a = keywords
      let b = this.userKeywords
      let z
      let commonVals
      if (b.length > a.length) {
        z = b
        b = a
        a = z
      }
      commonVals = a.filter(function (e) {
        return b.indexOf(e) > -1
      })
      if (commonVals.length > 0) {
        return true
      } else {
        return false
      }
    }
  },

  mixins: [getUserInfo]
}
</script>

<style scoped lang="css">
</style>
