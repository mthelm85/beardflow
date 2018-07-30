<template>
  <div class="h-100">
    <transition name="fade" mode="out-in">
      <router-view name="navbar"></router-view>
    </transition>
    <transition name="fade" :mode="transMode">
      <router-view name="body"></router-view>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view name="footer"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transMode: 'out-in'
    }
  },

  watch: {
    '$route' (to, from) {
      if (from.path === '/profile' && to.name === 'ViewPost') {
        this.transMode = ''
      }
    }
  }
}
</script>

<style>
body, html {
  height: 100%;
  overflow: auto;
}

.container-fluid {
  height: inherit;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter, .fade-leave-to/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.false-button {
  background-color: transparent;
  border: none;
}

.false-button:hover {
  cursor: pointer;
}

.false-button:focus {
  outline: none;
}

.height-enter-active, .height-leave-active {
  transition: all 1s;
  max-height: 1600px;
}
.height-enter, .height-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  max-height: 0;
}

</style>
