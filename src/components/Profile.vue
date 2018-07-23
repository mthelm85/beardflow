<template lang="html">
  <div class="container-fluid">
    <div class="row h-100 justify-content-center">

      <div class="col-xs-12 col-md-3 mt-3">
        <div class="card shadow">
          <img class="card-img-top" :src="user.profilePicUrl">
          <div class="card-body">
            <router-link to="/edit-profile" class="float-right cog"><i class="fas fa-cog"></i></router-link>
            <h5 class="card-title">{{ user.userName }}</h5>
            <p>{{ user.userTitle }}</p>
          </div>
          <div class="card-footer">
            <router-link to="/profile/posts-mine" class="btn btn-sm btn-outline-dark float-left">&nbsp;My Posts&nbsp;</router-link>
            <button class="btn btn-sm btn-outline-dark float-right">Saved Posts</button>
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
import Api from '@/router/api'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },

  computed: {
    ...mapGetters({
      user: 'getUserData'
    }),
    padBottom () {
      if (this.$mq === 'mobile') {
        return true
      } else {
        return false
      }
    }
  },

  created () {
    Api().get('/account').then((res) => {
      this.$store.state.user.profilePicUrl = res.data.profilePicUrl
      this.$store.state.user.userName = res.data.userName
      this.$store.state.user.userTitle = res.data.userTitle
      this.$store.state.user.userEmail = res.data.userEmail
      this.$store.state.user.userKeywords = res.data.keywords
      this.$store.state.user.userFavorites = res.data.favorites
    }).catch((err) => {
      console.log(err)
    })
  }
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
