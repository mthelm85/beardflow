<template lang="html">
  <div class="container h-100">
    <div class="row h-100 mt-3 justify-content-center">
      <div class="col-center text-center">
        <div class="card">
          <h4 class="card-header">Welcome to BeardFlow!</h4>
          <form @submit.prevent="upload">
            <div class="card-body">
              <p class="lead text-left">1) Choose a photo of your magnificent mane and/or 'stache:</p>
              <picture-input
                v-b-tooltip.hover.bottom title="Click the BeardFlow logo to select your photo"
                ref="pictureInput"
                @change="onChange"
                margin="16"
                :width="width"
                :height="height"
                :plain="true"
                prefill="/static/beard-black.png"
                radius="4"
                accept="image/jpeg,image/png"
                size="10"
                :hideChangeButton="true"
                :customStrings="{
                  upload: '<h1>Bummer!</h1>',
                  drag: 'Choose a jpg or png file'
                }">
              </picture-input>
              <p class="lead mt-5 text-left">2) Choose your beardonym (your display name):</p>
              <input v-model.trim.lazy="userName" id="userNameInput" class="form-control mx-auto mt-4" type="text" placeholder="BairdBeardsley" maxlength="17" style="max-width: 305px">
              <b-popover
                target="userNameInput"
                placement="left"
                triggers="null"
                :show.sync="namePopover">
                <template slot="title">Warning! <span class="float-right"><img src="../assets/beard-black.svg" width="20px"/></span></template>
                Your beardonym must be at least 5 characters in length</b-popover>
              <p class="lead mt-5 text-left">3) Enter a short display title:</p>
              <input v-model="userTitle" id="userTitleInput" class="form-control mx-auto mt-4" type="text" placeholder="Leader of the bearded brethren" maxlength="34" style="max-width: 305px">
              <b-popover
                target="userTitleInput"
                placement="left"
                triggers="null"
                :show.sync="titlePopover">
                <template slot="title">Warning! <span class="float-right"><img src="../assets/beard-black.svg" width="20px"/></span></template>
                Your title must be at least 5 characters in length</b-popover>
              <button class="btn btn-dark btn-lg mt-5" :disabled="disabled">Save</button>
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
import { imgSize } from '@/mixins/imgSize'
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
      profilePicUrl: '',
      userEmail: '',
      userName: '',
      userTitle: ''
    }
  },

  components: {
    PictureInput
  },

  computed: {
    disabled () {
      if (this.image !== null && this.userName.length > 4 && this.userTitle.length > 4) {
        return false
      } else {
        return true
      }
    },
    namePopover () {
      if (this.userName.length > 0 && this.userName.length < 5) {
        return true
      } else {
        return false
      }
    },
    titlePopover () {
      if (this.userTitle.length > 0 && this.userTitle.length < 5) {
        return true
      } else {
        return false
      }
    },
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
      formData.append('tags', 'profile_pic')
      formData.append('public_id', this.userEmail)
      // For debug purpose only
      // Inspects the content of formData
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }
      Axios.post(this.url, formData).then(res => {
        this.profilePicUrl = res.data.url
        Api().post('/account-setup', {
          userEmail: this.userEmail,
          profilePicUrl: this.profilePicUrl,
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

  mixins: [imgSize]
}
</script>

<style scoped lang="css">

</style>
