<template lang="html">
  <div class="container h-100">
    <div class="row h-100 mt-3 justify-content-center">
      <div class="col-center text-center">
        <div class="card">
          <h4 class="card-header">Change Your Look</h4>
          <form @submit.prevent="upload">
            <div class="card-body">
              <p class="lead text-left">Change the photo of your magnificent mane:</p>
              <picture-input
                v-b-tooltip.hover.bottom title="Click your photo to select a new one"
                ref="pictureInput"
                @change="onChange"
                margin="16"
                :width="width"
                :height="height"
                :plain="true"
                :prefill="user.profilePicUrl"
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
import { imgSize } from '@/mixins/imgSize'
import { mapGetters } from 'vuex'
import PictureInput from 'vue-picture-input'
export default {
  data () {
    return {
      cloudinary: {
        uploadPreset: Cloudinary.uploadPreset,
        apiKey: Cloudinary.apiKey,
        cloudName: Cloudinary.cloudName
      },
      image: null,
      newProfilePicUrl: '',
      userTitle: ''
    }
  },

  components: {
    PictureInput
  },

  computed: {
    ...mapGetters({
      user: 'getUserData'
    }),
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
    deletePic () {
      return new Promise((resolve, reject) => {
        Api().post('/delete-photo', {
          public_id: [`Profile Pics/${this.user.userEmail}`]
        }).then((res) => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    onChange (image) {
      if (image) {
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    async upload (file) {
      if (this.image !== null) {
        const deleted = await this.deletePic()
        if (deleted.status === 200) {
          const formData = new FormData()
          formData.append('file', this.image)
          formData.append('upload_preset', this.cloudinary.uploadPreset)
          formData.append('tags', 'profile_pic')
          formData.append('public_id', this.user.userEmail)
          // For debug purpose only
          // Inspects the content of formData
          for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1])
          }
          Axios.post(this.url, formData)
            .then((res) => {
              this.newProfilePicUrl = res.data.url
            })
            .then(() => {
              Api().post('/account-setup', {
                userEmail: this.user.userEmail,
                profilePicUrl: this.newProfilePicUrl,
                userName: this.user.userName,
                userTitle: this.userTitle
              })
            })
            .then(() => {
              this.$router.push('/profile')
            })
            .catch((err) => {
              alert(err)
            })
        }
      } else {
        Api().post('/account-setup', {
          userEmail: this.user.userEmail,
          profilePicUrl: this.user.profilePicUrl,
          userName: this.user.userName,
          userTitle: this.userTitle
        })
          .then(() => {
            this.$router.push('/profile')
          })
          .catch((err) => {
            alert(err)
          })
      }
    }
  },

  mixins: [imgSize]
}
</script>

<style scoped lang="css">

</style>
