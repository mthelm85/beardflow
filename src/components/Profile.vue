<template lang="html">
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div class="col-3 mt-3">
        <div class="card">
          <img class="card-img-top" src="../assets/6.jpeg">
          <div class="card-body">
            <h5 class="card-title">Matt Helm</h5>
            <p>BeardFlow Creator</p>
          </div>
        </div>
      </div>
      <div class="col-6 mt-3">
        <div class="list-group list-group-flush">
          <a v-for="post in posts" :key="post.date" href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ post.title }}</h5>
              <small>{{ post.date }}</small>
            </div>
            <p class="mb-1">{{ `${post.text.substring(0, 70)}...` }}</p>
            <small>By {{ post.user }}</small>
          </a>
        </div>
        <div class="card-footer">
          <a href="#">Post your own story...</a>
        </div>
      </div>
      <div class="col-3 mt-3">
        <div class="list-group">
          <p class="list-group-item bg-dark text-white text-center">Cool Beard Stuff</p>
          <a href="#" class="list-group-item list-group-item-action">Face Analysis</a>
          <a href="#" class="list-group-item list-group-item-action">Beard Time Lapse</a>
          <a href="#" class="list-group-item list-group-item-action">Create/Store Recipes</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
export default {
  data () {
    return {
      posts: []
    }
  },
  created () {
    Api().get('/get-posts')
      .then((res) => {
        let i = 0
        for (i = 0; i < res.data.length; i++) {
          this.posts.push(res.data[i])
        }
        console.log(this.posts)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style lang="css">
</style>
