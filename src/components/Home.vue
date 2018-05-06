<template lang="html">
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div class="col my-auto">
        <div class="card float-right mr-5">
            <div class="card-header text-center h4">
              <strong>Create A BeardFlow Account</strong> <span><img src="../assets/beard-black.svg" width="30px"/></span>
            </div>
            <div class="card-body">
              <form @submit.prevent="signup">
                <div class="form-group text-center">
                  <label class="lead" for="emailInput"><strong>Email Address</strong></label>
                  <input v-model.trim="email" type="email" class="form-control form-control-lg" id="emailInput" placeholder="Enter email">
                </div>
                <div class="form-group text-center">
                  <label class="lead" for="inputPass"><strong>Password</strong></label>
                  <input v-model.trim="password" type="password" class="form-control form-control-lg" id="inputPass" placeholder="Password">
                </div>
                <div class="form-group text-center">
                  <label class="lead" for="confirmPass"><strong>Confirm Password</strong></label>
                  <input type="password" class="form-control form-control-lg" id="confirmPass" placeholder="Confirm password">
                </div>
                <div class="row justify-content-center">
                  <button class="btn btn-lg btn-outline-dark">Submit</button>
                </div>
              </form>
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
.container-fluid {
  background-image: url('../assets/1.jpeg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
