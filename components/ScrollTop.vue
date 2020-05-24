<template>
  <v-fab-transition>
    <v-btn
      v-show="!hidden"
      ref="ScrollTop"
      :elevation="15"
      fixed
      bottom
      right
      fab
      color="red"
      @click="$vuetify.goTo(target, options)"
    >
      <v-icon color="white">mdi-arrow-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  name: 'ScrollTop',
  data() {
    return {
      hidden: true,
      duration: 1000,
      offset: 0,
      easing: 'easeInOutQuart'
    }
  },
  computed: {
    target() {
      return 'html'
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      }
    }
  },
  mounted() {
    // 顶部图标的显示与隐藏
    window.onscroll = () => {
      if (document.querySelector('html').scrollTop > 200) {
        this.hidden = false
      } else {
        this.hidden = true
      }
    }
  }
}
</script>
