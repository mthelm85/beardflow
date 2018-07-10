<template lang="html">
  <div class="card shadow">
    <p class="card-header bg-dark text-white text-center">Search Results</p>
      <div v-for="post in searchResults" :key="post._id" class="list-group list-group-flush">
        <router-link :to="{ name: 'ViewPost', params: { postId: post._id } }" class="list-group-item list-group-item-action flex-column align-items-start">
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
import { getUserInfo } from '@/mixins/getUserInfo'
import { mapGetters } from 'vuex'
import Moment from 'moment'
export default {
  data () {
    return {

    }
  },

  computed: {
    ...mapGetters({
      page: 'getCurrentPage',
      searchResults: 'getSearchResults',
      totalPages: 'getTotalPages'
    }),
    nextDisabled () {
      if (this.page === this.totalPages) {
        return true
      } else {
        return false
      }
    },
    prevDisabled () {
      if (this.page === 1) {
        return true
      } else {
        return false
      }
    }
  },

  filters: {
    relativeTime (date) {
      return Moment(date).fromNow()
    }
  },

  methods: {
    next () {
      this.page++
      this.getPosts()
    },
    previous () {
      this.page--
      this.getPosts()
    },
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
      if (commonVals.length > 5) {
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
