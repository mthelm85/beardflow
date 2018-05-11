<template lang="html">
  <div class="container h-100">
    <div class="row h-100 mt-3 justify-content-center">
      <div class="col-center text-center">
        This is where you choose your photo, screen name, and brief description
        <picture-input
          ref="pictureInput"
          @change="onChange"
          width="250"
          height="250"
          margin="16"
          accept="image/jpeg,image/png"
          size="10"
          buttonClass="btn btn-outline-dark"
          hideChangeButton="true"
          :customStrings="{
            upload: '<h1>Bummer!</h1>',
            drag: 'Choose a jpg or png file'
          }">
        </picture-input>
        <button class="btn btn-outline-dark mt-3" @click="upload">Upload</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import Cloudinary from '@/cloudinary.js'
import PictureInput from 'vue-picture-input'
export default {
  data () {
    return {
      cloudinary: {
        uploadPreset: Cloudinary.uploadPreset,
        apiKey: Cloudinary.apiKey,
        cloudName: Cloudinary.cloudName
      },
      image: null
    }
  },
  components: {
    PictureInput
  },
  computed: {
    url () {
      return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`
    }
  },
  methods: {
    onChange (image) {
      if (image) {
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    upload (file) {
      const formData = new FormData()
      formData.append('file', this.image)
      formData.append('upload_preset', this.cloudinary.uploadPreset)
      formData.append('tags', 'gs-vue,gs-vue-uploaded')
      // For debug purpose only
      // Inspects the content of formData
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }
      Axios.post(this.url, formData).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="css">
</style>
