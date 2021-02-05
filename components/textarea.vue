<template>
  <input
    aria-label="playlist link form"
    class="border-2 border-solid border-gray-800 py-3 px-4 rounded-sm mr-0 mb-3 md:mb-0 md:mr-5"
    type="text"
    name="updatePlaylistURL"
    placeholder="playlist link"
    @input="updatePlaylistURL($event.target.value)"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    updatePlaylistURL(value: string): void {
      this.$accessor.update_PlaylistUrl(value)
    },
  },
})
</script>
