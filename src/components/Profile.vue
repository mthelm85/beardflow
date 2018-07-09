<template lang="html">
  <div class="container-fluid">
    <div class="row h-100 justify-content-center">

      <div class="col-xs-12 col-md-3 mt-3">
        <div class="card shadow">
          <img class="card-img-top" :src="profilePicUrl">
          <div class="card-body">
            <router-link to="/edit-profile" class="float-right cog"><i class="fas fa-cog"></i></router-link>
            <h5 class="card-title">{{ userName }}</h5>
            <p>{{ userTitle }}</p>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
            <div class="card shadow mb-3">
              <div class="list-group" :class="{ 'pb-3': padBottom }">
                <p class="card-header bg-dark text-white text-center">
                  <span class="h6">Browse All Posts</span>
                </p>
                <router-link to="/profile/posts-general" class="list-group-item list-group-item-action">General Beard Discussions</router-link>
                <router-link to="/profile/posts-styling" class="list-group-item list-group-item-action">Styling & Grooming</router-link>
                <router-link to="/profile/posts-feedback" class="list-group-item list-group-item-action">Feedback & Help</router-link>
                <router-link to="/profile/posts-products" class="list-group-item list-group-item-action">Beard-Related Products</router-link>
                <router-link to="/profile/posts-recipes" class="list-group-item list-group-item-action">Beard Balm/Oil/Wax Recipes</router-link>
                <router-link to="/profile" class="list-group-item list-group-item-action">Latest Posts</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xs-12 col-md-9 mt-3">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>

    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/mixins/getUserInfo'
export default {
  data () {
    return {

    }
  },

  computed: {
    padBottom () {
      if (this.$mq === 'mobile') {
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
.cog {
  color: #777777;
}
.cog:hover {
  color: #e0e0e0;
}
</style>
