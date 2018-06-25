<template lang="html">
  <div class="container h-100">
    <div class="row h-100 text-center mt-3">
      <div class="col">
        <form>
          <div class="form-group" :class="{ 'opaque': opacity }">
            <label class="lead font-weight-bold">What is your post about?</label>
            <div class="row justify-content-center">
              <b-form-radio-group stacked v-model="category" class="text-left">
                <b-form-radio value="general">General beard discussion</b-form-radio>
                <b-form-radio value="styling">Styling, grooming, trimming</b-form-radio>
                <b-form-radio value="feedback">I need help/feedback</b-form-radio>
                <b-form-radio value="products">Beard-related products</b-form-radio>
                <b-form-radio value="recipes">Beard balm/oil/wax recipes</b-form-radio>
              </b-form-radio-group>
            </div>
            <label class="lead font-weight-bold mt-3" for="title">Title</label>
            <textarea v-model="title" class="form-control" rows="1" id="title"></textarea>
            <transition name="height" mode="out-in">
              <picture-input
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
            <label class="lead font-weight-bold mt-3 mb-3" for="text">Body</label>
            <button @click.prevent="showUploader" class="btn btn-sm btn-dark mt-3 addImage">{{ btnText }}</button>
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
import { getUserInfo } from '@/mixins/getUserInfo'
import { HollowDotsSpinner } from 'epic-spinners'
import { imgSize } from '@/mixins/imgSize'
import parallelDots from '@/parallelDots'
import { uploadImg } from '@/mixins/uploadImg'
export default {
  data () {
    return {
      category: '',
      loading: true,
      opacity: false,
      postKeywords: [],
      postPicUrl: '',
      showInput: false,
      title: '',
      text: ''
    }
  },

  components: {
    HollowDotsSpinner
  },

  computed: {
    btnText () {
      if (this.showInput === false) {
        return 'Add Image'
      } else {
        return 'Done'
      }
    },
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
      const uploaded = await this.upload()
      const keywords = await Axios.post(`https://apis.paralleldots.com/v3/keywords?text=${this.text}&api_key=${parallelDots.apiKey}`)
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
        category: this.category,
        postPicUrl: uploaded.url
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
    getUserInfo,
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

.addImage {
  position: absolute;
  right: 15px;
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
