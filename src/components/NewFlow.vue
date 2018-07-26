<template lang="html">
  <div class="container h-100 new-post-min-height">
    <div class="row h-100 text-center mt-3">
      <div class="col">
        <form class="mb-3">
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
            <p class="lead font-weight-bold mt-3">Attach Images</p>
            <uploader class="mt-3"></uploader>
            <label class="lead font-weight-bold mt-3 mb-3" for="text">Body</label>
            <textarea v-model="text" class="form-control" rows="12" id="text" maxlength="3000"></textarea>
          </div>
          {{ image1 }}
          <button class="btn btn-dark" @click.prevent="upload">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { cloudinaryUploads } from '@/mixins/cloudinaryUploads'
import { mapGetters } from 'vuex'
import Uploader from '@/components/Uploader'

export default {
  data () {
    return {
      category: '',
      title: '',
      text: ''
    }
  },

  components: {
    Uploader
  },

  computed: {
    ...mapGetters({
      user: 'getUserData'
    })
  },

  mixins: [cloudinaryUploads]
}
</script>

<style scoped lang="css">

</style>
