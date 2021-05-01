<template>
  <button
    class="border-2 border-solid border-gray-800 py-3 px-4 rounded-sm"
    @click="getPlaylistImages"
  >
    get started
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    getPlaylistImages() {
      this.$accessor.get_images_url()
    },
  },
})
</script>
