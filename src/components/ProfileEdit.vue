<template lang="html">
  <div class="container h-100">
    <div class="row h-100 mt-3 justify-content-center">
      <div class="col-center text-center">
        <div class="card">
          <h4 class="card-header">Change Your Look</h4>
          <form @submit.prevent="upload">
            <div class="card-body">
              <p class="lead text-left">Change the photo of your magnificent mane and/or 'stache:</p>
              <picture-input
                v-b-tooltip.hover.bottom title="Click your photo to select a new one"
                ref="pictureInput"
                @change="onChange"
                margin="16"
                :width="width"
                :height="height"
                :plain="true"
                :prefill="profilePicUrl"
                radius="4"
                accept="image/jpeg,image/png"
                size="10"
                :hideChangeButton="true"
                :customStrings="{
                  upload: '<h1>Bummer!</h1>',
                  drag: 'Choose a jpg or png file'
                }">
              </picture-input>
              <p class="lead mt-5 text-left">Change your display title:</p>
              <input v-model="userTitle" id="userTitleInput" class="form-control mx-auto mt-4" type="text" placeholder="Leader of the bearded brethren" maxlength="34" style="max-width: 305px">
              <b-popover
                target="userTitleInput"
                placement="left"
                triggers="null"
                :show.sync="titlePopover">
                <template slot="title">Warning! <span class="float-right"><img src="../assets/beard-black.svg" width="20px"/></span></template>
                Your title must be at least 5 characters in length</b-popover>
              <button class="btn btn-dark btn-lg mt-5">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
import Axios from 'axios'
import Cloudinary from '@/cloudinary.js'
import { getUserInfo } from '@/getUserInfo'
import PictureInput from 'vue-picture-input'
export default {
  created () {
    Api().get('/account').then((res) => {
      this.userEmail = res.data.userEmail
    }).catch((err) => {
      console.log(err)
    })
  },

  data () {
    return {
      cloudinary: {
        uploadPreset: Cloudinary.uploadPreset,
        apiKey: Cloudinary.apiKey,
        cloudName: Cloudinary.cloudName
      },
      image: null,
      newProfilePicUrl: ''
    }
  },

  components: {
    PictureInput
  },

  computed: {
    titlePopover () {
      if (this.userTitle.length > 0 && this.userTitle.length < 5) {
        return true
      } else {
        return false
      }
    },
    url () {
      return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`
    },
    width () {
      switch (this.$mq) {
        case 'desktop':
          return '250'
        case 'laptop':
          return '150'
        case 'tablet':
          return '100'
        case 'mobile':
          return '75'
      }
    },
    height () {
      switch (this.$mq) {
        case 'desktop':
          return '250'
        case 'laptop':
          return '150'
        case 'tablet':
          return '100'
        case 'mobile':
          return '75'
      }
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
    async upload (file) {
      const formData = new FormData()
      formData.append('file', this.image)
      formData.append('upload_preset', this.cloudinary.uploadPreset)
      formData.append('tags', 'profile_pic')
      // For debug purpose only
      // Inspects the content of formData
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }
      let deletePic = await Api().post('/delete-photo', {
        public_id: this.userEmail
      })

      Axios.post(this.url, formData).then(res => {
        this.newProfilePicUrl = res.data.url
        Api().post('/account-setup', {
          userEmail: this.userEmail,
          profilePicUrl: this.newProfilePicUrl,
          userName: this.userName,
          userTitle: this.userTitle
        }).then(() => {
          this.$router.push('/profile')
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  },

  mixins: [getUserInfo]
}
</script>

<style scoped lang="css">

</style>
