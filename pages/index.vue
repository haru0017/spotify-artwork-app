<template>
  <div class="text-center mt-24 mx-2 md:mt-44 mb-6">
    <h1 class="text-3xl md:text-5xl">Sav</h1>
    <h2 class="text-lg md:text-2xl mt-8">
      Sav (Spotify artwork viewer) inspired by itunes artwork screensaver. <br>
      Enter Playlist Link below and click "get started"
    </h2>
    <h4 class="texl-sm md:text-lg mt-2 mb-4">Without link, global top 50 playlists will show.</h4>
    <div class="text-base md:text-xl mt-8">
      <vtextarea class="mb-3 md:mb-0 md:mr-5"></vtextarea>
      <getimagebtn></getimagebtn>
    </div>
    <div v-if="this.$accessor.error_message.length" class="text-sm md:text-lg mt-12">
      <erroralert></erroralert>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import vtextarea from '../components/textarea.vue'
import getimagebtn from '../components/getimagebtn.vue'
import erroralert from '../components/erroralert.vue'

export default Vue.extend({

  components: {
    vtextarea,
    getimagebtn,
    erroralert,
  },

  async fetch({ app: { $accessor }, $config }): Promise<void> {
    const url: string = 'https://accounts.spotify.com/api/token'
    const auth: string = $config.apiKey
    const postData: string = 'grant_type=client_credentials'
    const axiosConfig: object = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: auth,
      },
    }
    try {
      const response = await axios.post(url, postData, axiosConfig)
      $accessor.update_access_token(response.data.access_token)
    } catch (error) {
      console.error(error.message)
    }
  },
})
</script>
