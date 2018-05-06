<template>
  <div class="h-100">
    <router-view name="navbar"></router-view>
    <router-view name="body"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style>
body, html {
  height: 100%;
  overflow: hidden;
}
</style>
