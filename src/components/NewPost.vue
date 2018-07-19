<template lang="html">
  <div class="container h-100 new-post-min-height">
    <div class="row h-100 text-center mt-3">
      <div class="col">
        <form>
          <div class="form-group" :class="{ 'opaque': opacity }">
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
            <div class="row justify-content-center">
              <div class="col-4  my-auto">
                <div class="thumb-container d-inline-block">
                  <div v-show="uploadingImg.thumb1" id="imageLoadingDots">
                    <hollow-dots-spinner
                      animation-duration="1000"
                      dot-size="15"
                      dots-num="3"
                      color="#000000"
                      style="margin-top: 70%;"
                    />
                  </div>
                  <b-img
                    @mouseover="imgHover(1)"
                    @mouseleave="imgHoverEnd(1)"
                    :class="{ 'hovering': hovering.thumb1 }"
                    class="mt-3"
                    v-if="hasMultiImg(1)"
                    thumbnail
                    :src="imageUrls[0]"
                    :width="100">
                  </b-img>
                  <div
                    v-show="hovering.thumb1"
                    :class=" { 'pointer': hovering.thumb1 } "
                    class="trash-can text-danger"
                    @click="deletePic(0)"
                    @mouseover="imgHover(1)"
                    @mouseleave="imgHoverEnd(1)">
                    <i class="fas fa-trash-alt"></i>
                  </div>
                </div>
                <div class="thumb-container d-inline-block">
                  <b-img
                    @mouseover="imgHover(2)"
                    @mouseleave="imgHoverEnd(2)"
                    :class="{ 'hovering': hovering.thumb2 }"
                    class="mt-3"
                    v-if="hasMultiImg(2)"
                    thumbnail
                    :src="imageUrls[1]"
                    :width="100">
                  </b-img>
                  <div
                    v-show="hovering.thumb2"
                    :class=" { 'pointer': hovering.thumb2 } "
                    class="trash-can text-danger"
                    @click="deletePic(1)"
                    @mouseover="imgHover(2)"
                    @mouseleave="imgHoverEnd(2)">
                    <i class="fas fa-trash-alt"></i>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div v-show="uploadingImg.input" id="imageLoadingDots">
                  <hollow-dots-spinner
                    animation-duration="1000"
                    dot-size="15"
                    dots-num="3"
                    color="#000000"
                    style="margin-top: 70%;"
                  />
                </div>
                <transition name="fade" mode="out-in">
                  <picture-input
                    :key="imageUrls.length"
                    :class="{ 'opaque': inputOpacity, 'disabledInput': !maxImgs }"
                    class="mt-3"
                    v-if="showInput"
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
                </transition>
              </div>
              <div class="col-4 my-auto">
                <b-alert v-if="!maxImgs" class="mt-3" show variant="secondary">Only two images per post are allowed</b-alert>
              </div>
            </div>
            <label class="lead font-weight-bold mt-3 mb-3" for="text">Body</label>
              <button
                v-show="!showAddImage"
                @click.prevent="multiImg"
                class="btn btn-sm btn-dark mt-3 addImage"
                :disabled="!maxImgs">
                  Upload
              </button>
              <button v-show="showAddImage" @click.prevent="showUploader" class="btn btn-sm btn-dark mt-3 addImage">Add Image(s)</button>
            <textarea v-model="text" class="form-control" rows="12" id="text" maxlength="3000"></textarea>
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
import { HollowDotsSpinner } from 'epic-spinners'
import { imgSize } from '@/mixins/imgSize'
import { mapGetters } from 'vuex'
import parallelDots from '@/parallelDots'
import { uploadImg } from '@/mixins/uploadImg'
export default {
  data () {
    return {
      category: '',
      hovering: {
        thumb1: false,
        thumb2: false
      },
      imageUrls: [],
      inputOpacity: false,
      loading: true,
      opacity: false,
      postKeywords: [],
      showInput: false,
      title: '',
      text: '',
      uploadingImg: {
        input: false,
        thumb1: false,
        thumb2: false
      },
      thumbPubIds: []
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
    },
    ...mapGetters({
      user: 'getUserData'
    }),
    showAddImage () {
      if (this.showInput === false) {
        return true
      } else {
        return false
      }
    },
    maxImgs () {
      if (this.imageUrls.length <= 1) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    deletePic (n) {
      if (n === 0) {
        this.uploadingImg.thumb1 = true
      } else {
        this.uploadingImg.thumb2 = true
      }
      Api().post('/delete-photo', {
        folder: '',
        public_id: this.thumbPubIds[n]
      }).then((res) => {
        if (n === 0) {
          this.uploadingImg.thumb1 = false
          this.imageUrls.splice(0, 1)
        } else {
          this.uploadingImg.thumb2 = false
        }
      }).catch((err) => {
        if (n === 0) {
          this.uploadingImg.thumb1 = false
        } else {
          this.uploadingImg.thumb2 = false
        }
        alert(err)
      })
    },
    hasMultiImg (n) {
      if (this.imageUrls.length >= n) {
        return true
      } else {
        return false
      }
    },
    imgHover (n) {
      if (n === 1) {
        this.hovering.thumb1 = true
      } else {
        this.hovering.thumb2 = true
      }
    },
    imgHoverEnd (n) {
      if (n === 1) {
        this.hovering.thumb1 = false
      } else {
        this.hovering.thumb2 = false
      }
    },
    async multiImg () {
      if (this.image !== null) {
        this.uploadingImg.input = true
        this.inputOpacity = true
        const uploaded = await this.upload()

        if (uploaded.url) {
          this.imageUrls.push(uploaded.url)
          this.thumbPubIds.push(uploaded.public_id)
          this.inputOpacity = false
          this.uploadingImg.input = false
          this.image = null
        }
      } else {
        alert('Pick a photo, dummy!')
      }
    },
    async post () {
      this.loading = false
      this.opacity = true
      const keywords = await Axios.post(`https://apis.paralleldots.com/v3/keywords?text=${this.text}&api_key=${parallelDots.apiKey}`)
      let i
      for (i = 0; i < keywords.data.keywords.length; i++) {
        this.postKeywords.push(keywords.data.keywords[i].keyword)
      }

      Api().post('/post', {
        title: this.title,
        text: this.text.replace(/\n\s*\n\s*\n/g, '\n\n'),
        user: this.user.userName,
        userPic: this.user.profilePicUrl,
        keywords: this.postKeywords,
        category: this.category,
        imageUrls: this.imageUrls
      }).then((res) => {
        if (res.data.success === 'yes') {
          this.$router.push('/profile')
        } else {
          alert('Unable to post')
          console.log(res.data.error)
          this.$router.push('/profile')
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    showUploader () {
      this.showInput = !this.showInput
    }
  },

  mixins: [
    uploadImg,
    imgSize
  ]
}
</script>

<style scoped lang="css">
form {
  opacity: 1;
  transition: all 1s ease;
}

i {
  font-size: 24px;
}

.addImage {
  position: absolute;
  right: 15px;
}

.b-img:hover {
  cursor: pointer;
  opacity: 0.3;
}

.disabledInput {
  opacity: 0.3;
}

.hovering {
  opacity: 0.3;
  cursor: pointer;
}

.loaderBtn {
  background: none;
  border: none;
  width: 105px;
}

.new-post-min-height {
  min-height: 854px;
}

.opaque {
  animation: lighten 1s forwards;
}

.pointer {
  cursor: pointer;
}

.thumb-container {
  position: relative;
}

.trash-can {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

#imageLoadingDots {
  position: absolute;
  width: 90px;
  left: 50%;
  margin-left: -45px;
  z-index: 100000;
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
