<template lang="html">
  <div class="col-8 my-auto text-right h5">
    <button @click="liked" class="false-button">
      <transition name="fade" mode="out-in">
        <i v-if="like" key="white" class="fas fa-thumbs-up"></i>
        <i v-else key="black" class="far fa-thumbs-up"></i>
      </transition>
    </button>
    <span class="lead">I like this post</span>
    <img src="../assets/beard-black.svg" width="30px"/>
    <span class="lead">This post sucks</span>
    <button @click="disliked" class="false-button">
      <transition name="fade" mode="out-in">
        <i v-if="dislike" key="white" class="fas fa-thumbs-down"></i>
        <i v-else key="black" class="far fa-thumbs-down"></i>
      </transition>
    </button>
  </div>
</template>

<script>
import Api from '@/router/api'
export default {
  data () {
    return {
      like: false,
      dislike: false
    }
  },

  methods: {
    liked () {
      console.log(this.keywords, this.userEmail)
      if (this.like === false) {
        this.like = true
        this.dislike = false
      }
      Api().post('/like-post', {
        email: this.userEmail,
        keywords: this.postKeywords
      })
    },
    disliked () {
      if (this.dislike === false) {
        this.dislike = true
        this.like = false
      }
    }
  },

  props: ['postKeywords', 'userEmail']
}
</script>

<style scoped lang="css">
</style>
