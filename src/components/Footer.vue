<template lang="html">
  <nav v-if="show" class="navbar bottom navbar-dark bg-dark">
    <div class="float-left py-3">
      <a class="text-secondary px-3" href="#"><i class="fab fa-facebook"></i></a>
      <a class="text-secondary px-3" href="#"><i class="fab fa-twitter-square"></i></a>
      <a class="text-secondary px-3" href="#"><i class="fab fa-instagram"></i></a>
      <a class="text-secondary px-3" href="#"><i class="fab fa-pinterest-square"></i></a>
      <a href="mailto:mail@matthelm.me" class="ml-3 text-white">mail@beardflow.io</a>
    </div>
    <div class="float-right text-white py-3">
        © {{ year }} BeardFlow
        <img src="../assets/beard.svg" width="30px"/>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear()
    },
    show () {
      if (this.$mq === 'mobile') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped lang="css">

i {
  font-size: 1.5em;
}

i:hover {
  color: #D3D3D3;
}

</style>
