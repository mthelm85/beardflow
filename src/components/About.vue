<template lang="html">
  <div class="container-fluid with-bg-photo">
    <div class="row h-100">
      <div class="col my-auto">
        <div class="card float-right mr-5" style="width: 400px">
          <div class="card-header text-center bg-dark text-white h4">
            About BeardFlow <span><img src="../assets/beard.svg" width="30px"/></span>
          </div>
          <div class="card-body lead text-justify">
            <p>
              Simply put, BeardFlow is a place to read and write about beards. BeardFlow is not quite a forum,
              nor is it a social media site. You can think of it as a fusion between a social media
              site and a traditional forum.
            </p>
            <p>
              It is a place to learn, share ideas, and celebrate the bearded lifestyle. Create your free account
              today and find out for yourself what BeardFlow is all about.
            </p>
            <div class="text-center">
              <router-link to="/" class="btn btn-dark">Sign Up</router-link>
            </div>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="css">

.with-bg-photo {
  background-image: url('../assets/9.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
