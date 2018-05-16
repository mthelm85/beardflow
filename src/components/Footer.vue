<template lang="html">
  <footer class="page-footer bg-dark text-white pt-0">
      <div class="container">
          <div class="row">
              <div class="col">
                <div class="float-left py-3">
                  <a class="text-white px-3" href="#"><i class="fab fa-facebook"></i></a>
                  <a class="text-white px-3" href="#"><i class="fab fa-twitter-square"></i></a>
                  <a class="text-white px-3" href="#"><i class="fab fa-instagram"></i></a>
                  <a class="text-white px-3" href="#"><i class="fab fa-pinterest-square"></i></a>
                </div>
                <div class="float-right py-4">
                    © {{ year }} BeardFlow
                    <img src="../assets/beard.svg" width="30px"/>
                </div>
              </div>
          </div>
      </div>

  </footer>

</template>

<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped lang="css">

i {
  font-size: 3em;
}

i:hover {
  color: #D3D3D3;
}

</style>
