<template lang="html">
  <div class="row">
    <div class="col-3">

    </div>
    <div class="col-3">
      <picture-input
        height=150
        width=150
        @change="onChangeFirst"
        radius="4"
        :hideChangeButton="true"
        :plain="true"
        prefill="/static/beard-black.png">
      </picture-input>
    </div>
    <div class="col-3">
      <picture-input
      height=150
      width=150
      @change="onChangeSecond"
      radius="4"
      :hideChangeButton="true"
      :plain="true"
      prefill="/static/beard-black.png">
    </picture-input>
    </div>
    <div class="col-3">

    </div>
  </div>
</template>

<script>
import { cloudinaryUploads } from '@/mixins/cloudinaryUploads'
import pictureInput from 'vue-picture-input'
export default {
  components: {
    pictureInput
  },

  mixins: [cloudinaryUploads]
}
</script>

<style lang="css">
</style>
