<template>
  <div id="fullscreen" class="bg-black text-center fixed w-full h-full top-0 left-0 text-0">
    <!-- Ignore the error because set key in the img element instead of the div element for the transition -->
    <div
      v-for="image in this.$accessor.images_url"
      class="inline-block"
    >
      <transition name="imgRotate" mode="out-in">
        <img :src="image" alt="artwork-image" :key="image" class="w-44 h-44 md:w-60 md:h-60 artwork-image"/>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  created() {
    if (!this.$accessor.images_url.length) {
      this.$router.push('/')
    }
  },

  mounted() {
    this.$accessor.set_timer(window.setInterval(this.change_image, 1200))
    this.fullscreen()
  },

  beforeDestroy() {
    clearInterval(this.$accessor.timer)
  },

  methods: {
    fullscreen() {
      const target = document.getElementById('fullscreen') as Element
      if (target) {
        target.requestFullscreen()
      }
    },

    change_image() {
      const randImageIndex = Math.floor(
        Math.random() * this.$accessor.images_url.length
      )
      const randAlternativeImageIndex = Math.floor(
        Math.random() * this.$accessor.alternative_images_url.length
      )
      this.$accessor.swap_url({
        rand_image_index: randImageIndex,
        rand_alternative_image_index: randAlternativeImageIndex,
      })
    },
  },
})
</script>

<style scoped>
  .imgRotate-enter-active, .imgRotate-leave-active {
    transition: 0.5s linear;
  }
  .imgRotate-enter, .imgRotate-leave {
    transform: rotateY(90deg);
  }
</style>