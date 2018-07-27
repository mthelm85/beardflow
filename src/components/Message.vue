<template lang="html">
  <div class="container h-100">
    <div class="row h-100 text-center mt-3">
      <div class="col">
        <form class="mb-3" @submit.prevent>
          <div class="form-group">
            <label class="lead font-weight-bold">Subject</label>
            <textarea v-model="subject" class="form-control" rows="1" id="title" maxlength="70"></textarea>
            <label class="lead font-weight-bold mt-3">Message</label>
            <textarea v-model="messageBody" class="form-control" rows="12" id="text" maxlength="3000"></textarea>
          </div>
          <router-link :to="{ name: 'PostsBy', params: { user: userTo } }" class="btn btn-dark">Submit</router-link>
        </form>
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
      messageBody: '',
      subject: '',
      userTo: this.$router.history.current.params.user
    }
  },

  beforeDestroy () {
    Api().post('/send-message', {
      message: {
        userTo: this.userTo,
        userFrom: this.userFrom.userName,
        body: this.messageBody,
        subject: this.subject
      }
    })
  },

  computed: {
    ...mapGetters({
      userFrom: 'getUserData'
    })
  }
}
</script>

<style lang="css">
</style>
