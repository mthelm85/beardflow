<template>
  <div class="h-100">
    <transition name="fade" mode="out-in" appear>
      <router-view name="navbar"></router-view>
    </transition>
    <transition name="fade" mode="out-in" appear>
      <router-view v-if="$mq === 'laptop' || $mq === 'desktop' || $mq === 'tablet'" name="body"></router-view>
      <router-view v-else name="body-mobile"></router-view>
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
  transition: opacity .5s ease;
}

.fade-enter, .fade-leave-to/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
