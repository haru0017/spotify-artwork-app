<template>
  <div id="fullscreen" class="bg-black text-center w-full h-full fixed top-0 left-0 text-0">
    <p
      v-for="(image, index) in this.$accessor.images_url"
      :key="`image-${index}`"
      class="inline-block"
    >
      <img :src="image" alt="artwork-image" class="w-44 h-44 md:w-60 md:h-60 artwork-image"/>
    </p>
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
    const el = document.getElementsByClassName('artwork-image')
    const idName = 'image'
    for (let i = 0; i < el.length; i++) {
      el[i].setAttribute('id', `${idName}_${i}`)
    }
    this.$accessor.set_timer(window.setInterval(this.change_image, 2000))
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
      if (process.client) {
        const randImageIndex = Math.floor(
          Math.random() * this.$accessor.images_url.length
        )
        const randAlternativeImageIndex = Math.floor(
          Math.random() * this.$accessor.alternative_images_url.length
        )
        const image = document.getElementById(
          `image_${randImageIndex}`
        ) as HTMLImageElement
        let opacity = 1.0
        let interval = setInterval(() => {
          opacity -= 0.025
          image.style.opacity = `${opacity}`
          if (opacity <= 0) {
            clearInterval(interval)
            image.src = this.$accessor.alternative_images_url[randAlternativeImageIndex]
            this.$accessor.swap_url({
              rand_image_index: randImageIndex,
              rand_alternative_image_index: randAlternativeImageIndex,
            })
            opacity = 0
            interval = setInterval(() => {
              opacity += 0.025
              image.style.opacity = `${opacity}`
              if (opacity >= 1) {
                clearInterval(interval)
              }
            }, 25)
          }
        }, 25)
      }
    },
  },
})
</script>
