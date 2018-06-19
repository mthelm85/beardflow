<template lang="html">
  <div class="container h-100">
    <div class="row h-100 text-center mt-3">
      <div class="col">
        <form>
          <div class="form-group" :class="{ 'opaque': opacity }">
            <label class="lead font-weight-bold">What is your post about?</label>
            <b-form-radio-group v-model="category">
              <b-form-radio value="general">General beard discussion</b-form-radio>
              <b-form-radio value="styling">Styling, grooming, trimming</b-form-radio>
              <b-form-radio value="feedback">I need help/feedback</b-form-radio>
              <b-form-radio value="products">Beard-related products</b-form-radio>
              <b-form-radio value="recipes">Beard balm/oil/wax recipes</b-form-radio>
            </b-form-radio-group>
            <label class="lead font-weight-bold mt-3" for="title">Title</label>
            <textarea v-model="title" class="form-control" rows="1" id="title"></textarea>
            <label class="lead font-weight-bold mt-3" for="text">Body</label>
            <textarea v-model="text" class="form-control" rows="12" id="text"></textarea>
          </div>
          <button v-if="loading" class="btn btn-dark" @click.prevent="post" :disabled="disabled">Submit</button>
          <button v-else disabled class="loaderBtn">
            <hollow-dots-spinner
              animation-duration="1000"
              dot-size="15"
              dots-num="3"
              color="#000000"
              id="loader"
            />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
import Axios from 'axios'
import { getUserInfo } from '@/getUserInfo'
import { HollowDotsSpinner } from 'epic-spinners'
export default {
  data () {
    return {
      category: '',
      loading: true,
      opacity: false,
      postKeywords: [],
      title: '',
      text: ''
    }
  },

  components: {
    HollowDotsSpinner
  },

  computed: {
    disabled () {
      if (this.title && this.text && this.category) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    async post () {
      this.loading = false
      this.opacity = true
      const keywords = await Axios.post(`https://apis.paralleldots.com/v3/keywords?text=${this.text}&api_key=FlCE7ByUzvtH1PSXffuVd470L3ZIY61KDeNJnE8y9B4`)
      let i
      for (i = 0; i < keywords.data.keywords.length; i++) {
        this.postKeywords.push(keywords.data.keywords[i].keyword)
      }

      Api().post('/post', {
        title: this.title,
        text: this.text,
        user: this.userName,
        userPic: this.profilePicUrl,
        keywords: this.postKeywords,
        category: this.category
      }).then((res) => {
        if (res.data.success === 'yes') {
          this.$router.push('/profile')
        } else {
          console.log('Unable to post')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },

  mixins: [getUserInfo]
}
</script>

<style scoped lang="css">
form {
  opacity: 1;
}

.loaderBtn {
  background: none;
  border: none;
  width: 105px;
}

.opaque {
  animation: lighten 1s forwards;
}

@keyframes lighten {
  0% {
    opacity: 1
  }
  100% {
    opacity: 0.3
  }
}

</style>
