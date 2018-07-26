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
                  width="100"
                  :src="imageUrls[0]">
                </b-img>
              </div>
              <div class="col-6">
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
          <button class="btn btn-dark" @click.prevent="upload">Submit</button>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import Cloudinary from '@/cloudinary'
import { mapGetters } from 'vuex'
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
      imageUrls: [],
      title: '',
      text: ''
    }
  },

  components: {
    VueUppyCloudinary
  },

  computed: {
    ...mapGetters({
      user: 'getUserData'
    })
  },

  methods: {
    saveImgUrls (data) {
      this.imageUrls.push(data.url)
    }
  }
}
</script>

<style scoped lang="css">

</style>
