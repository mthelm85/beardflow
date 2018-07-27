<template lang="html">
  <div class="container h-100 new-post-min-height">
    <div class="row h-100 text-center mt-3">
      <div class="col">
        <form @submit.prevent class="mb-3">
          <div class="form-group">
            <label class="lead font-weight-bold">What is your post about?</label>
            <div class="row justify-content-center">
              <b-form-radio-group stacked v-model="category" class="text-left">
                <b-form-radio value="general">General beard discussion</b-form-radio>
                <b-form-radio value="styling">Styling, grooming, trimming</b-form-radio>
                <b-form-radio value="feedback">I want help/feedback</b-form-radio>
                <b-form-radio value="products">Beard-related products</b-form-radio>
                <b-form-radio value="recipes">Beard balm/oil/wax recipes</b-form-radio>
              </b-form-radio-group>
            </div>
            <label class="lead font-weight-bold mt-3" for="title">Title</label>
            <textarea v-model="title" class="form-control" rows="1" id="title" maxlength="70"></textarea>
            <div class="row mt-4">
              <div class="col-6">
                <b-img
                  thumbnail
                  rounded
                  :blank="blank(0)"
                  height="100"
                  width="100"
                  :src="imageUrls[0]">
                </b-img>
                <b-img
                  thumbnail
                  rounded
                  :blank="blank(1)"
                  height="100"
                  width="100"
                  :src="imageUrls[1]">
                </b-img>
              </div>
              <div class="col-6 my-auto">
                <vue-uppy-cloudinary
                  :preset="cloudinary.preset"
                  :cloudName="cloudinary.cloudName"
                  maxNumberOfFiles="2"
                  @uploaded="saveImgUrls"
                  buttonText="Attach Images"
                  buttonStyle="btn btn-dark">
                </vue-uppy-cloudinary>
              </div>
            </div>
            <label class="lead font-weight-bold mt-3 mb-3" for="text">Body</label>
            <textarea v-model="text" class="form-control" rows="12" id="text" maxlength="3000"></textarea>
          </div>
          <router-link to="/profile" :class="{ disabled: disabled }" class="btn btn-dark">Submit</router-link>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
import Axios from 'axios'
import Cloudinary from '@/cloudinary'
import { mapGetters } from 'vuex'
import parallelDots from '@/parallelDots'
import VueUppyCloudinary from 'vue-uppy-cloudinary'
import 'vue-uppy-cloudinary/dist/lib/vue-uppy-cloudinary.min.css'

export default {
  data () {
    return {
      category: '',
      cloudinary: {
        preset: Cloudinary.uploadPreset,
        cloudName: Cloudinary.cloudName
      },
      imagePubIds: [],
      imageUrls: [],
      keywords: [],
      title: '',
      text: ''
    }
  },

  async beforeDestroy () {
    if (this.category !== '' && this.title !== '' && this.text !== '') {
      const keywords = await Axios.post(`https://apis.paralleldots.com/v3/keywords?text=${this.text}&api_key=${parallelDots.apiKey}`)
      let i
      for (i = 0; i < keywords.data.keywords.length; i++) {
        this.keywords.push(keywords.data.keywords[i].keyword)
      }
      Api().post('/post', {
        title: this.title,
        text: this.text.replace(/\n\s*\n\s*\n/g, '\n\n'),
        user: this.user.userName,
        userPic: this.user.profilePicUrl,
        keywords: this.keywords,
        category: this.category,
        imageUrls: this.imageUrls
      })
    } else {
      Api().post('/delete-photo', {
        public_id: this.imagePubIds
      })
    }
  },

  components: {
    VueUppyCloudinary
  },

  computed: {
    disabled () {
      if (this.category !== '' && this.title !== '' && this.text !== '') {
        return false
      } else {
        return true
      }
    },
    ...mapGetters({
      user: 'getUserData'
    })
  },

  methods: {
    blank (n) {
      if (n === 0) {
        return (this.imageUrls.length === 0)
      } else {
        return (this.imageUrls.length <= 1)
      }
    },
    saveImgUrls (data) {
      this.imagePubIds.push(data.public_id)
      this.imageUrls.push(data.url)
    }
  }
}
</script>

<style scoped lang="css">

</style>
