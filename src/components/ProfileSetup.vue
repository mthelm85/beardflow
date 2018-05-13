<template lang="html">
  <div class="container h-100">
    <div class="row h-100 mt-3 justify-content-center">
      <div class="col-center text-center">
        <div class="card scrollable">
          <h4 class="card-header">Welcome to BeardFlow!</h4>
          <div class="card-body">
            <p class="lead text-left">1) Choose a photo of your magnificent mane and/or 'stache:</p>
            <picture-input
              ref="pictureInput"
              @change="onChange"
              width="250"
              height="250"
              margin="16"
              accept="image/jpeg,image/png"
              fileName="beard.jpg"
              size="10"
              buttonClass="btn btn-outline-dark"
              hideChangeButton="true"
              :customStrings="{
                upload: '<h1>Bummer!</h1>',
                drag: 'Choose a jpg or png file'
              }">
            </picture-input>
            <p class="lead mt-5 text-left">2) Choose your beardonym (your display name):</p>
            <input v-model="userName" class="form-control mx-auto mt-4" type="text" placeholder="BairdBeardsley" maxlength="17" style="max-width: 305px">
            <p class="lead mt-5 text-left">3) Enter a short display title:</p>
            <input v-model="userTitle" class="form-control mx-auto mt-4" type="text" placeholder="Leader of the bearded brethren" maxlength="34" style="max-width: 305px">
            <button class="btn btn-dark btn-lg mt-5" @click="upload">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
import Axios from 'axios'
import Cloudinary from '@/cloudinary.js'
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
  }
}
</script>

<style scoped lang="css">
.scrollable {
  overflow-y: scroll;
}

</style>
