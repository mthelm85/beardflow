<template lang="html">
  <div class="card shadow">
    <p class="card-header bg-dark text-white text-center">Styling & Grooming</p>
    <transition name="post" mode="out-in">
      <div class="list-group list-group-flush" :key="page">
        <router-link v-for="post in posts" :key="post._id" :to="{ name: 'ViewPost', params: { postId: post._id } }" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ post.title }}
              <img src="../../assets/beard-black.svg"
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
        </router-link>
      </div>
    </transition>
    <div class="card-footer">
      <router-link to="/post" class="btn btn-warning btn-sm mt-2">Post your own story</router-link>
      <ul class="pagination pagination-sm float-right mt-2">
        <li class="page-item" :class="{ disabled: prevDisabled }"><button class="page-link" @click.prevent="previous">Previous</button></li>
        <li class="page-item disabled"><button class="page-link">{{ page }} of {{ totalPages }}</button></li>
        <li class="page-item" :class="{ disabled: nextDisabled }"><button class="page-link" @click.prevent="next">Next</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
import { getUserKeywords } from '@/mixins/getUserKeywords'
import Moment from 'moment'
import { prevNext } from '@/mixins/prevNext'
export default {
  data () {
    return {
      posts: []
    }
  },

  created () {
    Api().get('/get-posts-categorized', {
      params: {
        category: 'styling',
        page: this.page
      }
    })
      .then((res) => {
        this.posts = res.data.docs
        this.totalPages = res.data.pages
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

  mixins: [getUserKeywords, prevNext]
}
</script>

<style scoped lang="css">
</style>
