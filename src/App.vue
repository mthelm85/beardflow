<template>
  <div class="h-100">
    <transition name="fade" mode="out-in" appear>
      <router-view name="navbar"></router-view>
    </transition>
    <transition name="fade" mode="out-in" appear>
      <router-view name="body"></router-view>
    </transition>
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

::-webkit-scrollbar {
    display: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
