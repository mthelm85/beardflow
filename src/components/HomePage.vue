<template lang="html">
  <div class="h-100">
    <home-mbl v-if="home"></home-mbl>
    <home v-else></home>
  </div>
</template>

<script>
import Home from '@/components/Home'
import HomeMbl from '@/components/mobile/HomeMbl'
export default {
  components: {
    Home,
    HomeMbl
  },

  computed: {
    home () {
      if (this.$mq === 'mobile') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="css">
</style>
