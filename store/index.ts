import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex'
import axios from 'axios'

export const state = () => {
  return {
    access_token: 'hoge_token' as string,
    playlist_url: 'https://open.spotify.com/playlist/37i9dQZF1DX9oegrjMzKDW' as string,
    images_url: [] as string[],
    alternative_images_url: [] as string[],
    timer: 0 as number,
    error_message: '' as string,
  }
}

export const getters = getterTree(state, {
  get_authorization_header(state): string {
    return 'Bearer' + ' ' + state.access_token
  },
  get_playlist_id(state): string {
    let playlist_id: string = state.playlist_url.replace(
      'https://open.spotify.com/playlist/',
      ''
    )
    for (let step: number = 0; step < playlist_id.length; step++) {
      if (playlist_id[step] == '?') {
        return playlist_id.slice(0, step)
      }
    }
    return playlist_id
  },
})

export const mutations = mutationTree(state, {
  update_access_token(state, new_access_token: string): void {
    state.access_token = new_access_token
  },
  update_PlaylistUrl(state, new_playlist_url: string): void {
    state.playlist_url = new_playlist_url
  },
  update_imagesUrl(state, new_images_url: string[]): void {
    state.images_url = new_images_url
  },
  update_alternative_imagesUrl(
    state,
    new_alternative_images_url: string[]
  ): void {
    state.alternative_images_url = new_alternative_images_url
  },
  swap_images(state, index: {rand_image_index: number, rand_alternative_image_index: number}): void {
    // Change the contents of the array in a way that vue can recognize
    let tmp = state.images_url[index.rand_image_index]
    state.images_url.splice(index.rand_image_index, 1, state.alternative_images_url[index.rand_alternative_image_index])
    state.alternative_images_url.splice(index.rand_alternative_image_index, 1, tmp)
  },
  update_timer(state, new_timer: number): void {
    state.timer = new_timer
  },
  update_erorr_message(state, new_error_message): void {
    state.error_message = new_error_message
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    update_playlist_url({ commit }, new_playlist_url: string): void {
      commit('update_PlaylistUrl', new_playlist_url)
    },
    async get_images_url({ commit, getters }): Promise<void> {
      const endpoint: string = 'https://api.spotify.com/v1/playlists/'
      const playlist_id: string = getters.get_playlist_id
      const q: string = '?fields=tracks.items(track.album.images)'
      const url: string = endpoint + playlist_id + q
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getters.get_authorization_header,
        },
      }
      try {
        const response = await axios.get(url, config)
        const images_url: string[] = []
        const alternative_images_url: string[] = []
        if (Object.keys(response.data['tracks']['items']).length > 40) {
          for (let step: number = 0; step < 40; step++) {
            try {
              images_url.push(
                response.data['tracks']['items'][step]['track']['album'][
                  'images'
                ][0]['url']
              )
            } catch (error) {
              console.error(error.message)
            }
          }
          for (
            let step = 40;
            step < Object.keys(response.data['tracks']['items']).length;
            step++
          ) {
            try {
              alternative_images_url.push(
                response.data['tracks']['items'][step]['track']['album'][
                  'images'
                ][0]['url']
              )
            } catch (error) {
              console.error(error.message)
            }
          }
        } else {
          for (
            let step: number = 0;
            step < Object.keys(response.data['tracks']['items']).length;
            step++
          ) {
            try {
              images_url.push(
                response.data['tracks']['items'][step]['track']['album'][
                  'images'
                ][0]['url']
              )
            } catch (error) {
              console.error(error.message)
            }
          }
          for (
            let step = Object.keys(response.data['tracks']['items']).length;
            step < 40;
            step++
          ) {
            try {
              images_url.push(
                response.data['tracks']['items'][
                  step % response.data['tracks']['items'].length
                ]['track']['album']['images'][0]['url']
              )
            } catch (error) {
              console.error(error.message)
            }
          }
          if (40 % Object.keys(response.data['tracks']['items']).length != 0) {
            for (
              let step =
                40 % Object.keys(response.data['tracks']['items']).length;
              step < Object.keys(response.data['tracks']['items']).length;
              step++
            ) {
              try {
                alternative_images_url.push(
                  response.data['tracks']['items'][step]['track']['album'][
                    'images'
                  ][0]['url']
                )
              } catch (error) {
                console.error(error.message)
              }
            }
          } else {
            for (
              let step = 0;
              step < Object.keys(response.data['tracks']['items']).length;
              step++
            ) {
              try {
                alternative_images_url.push(
                  response.data['tracks']['items'][step]['track']['album'][
                    'images'
                  ][0]['url']
                )
              } catch (error) {
                console.error(error.message)
              }
            }
          }
        }
        if(images_url.length < 40) {
          for(let i = 0; i == (40-images_url.length); i++) {
            images_url.push(alternative_images_url[0])
            alternative_images_url.shift()
          }
        }

        // shuffle images_url
        for (let i = images_url.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          // not working Destructuring assignment
          const tmp = images_url[i]
          images_url[i] = images_url[j]
          images_url[j] = tmp
        }

        // commit
        commit('update_imagesUrl', images_url)
        commit('update_alternative_imagesUrl', alternative_images_url)
        commit('update_erorr_message', '')
        this.$router.push('/artwork')
      } catch (error) {
        console.error(error.message)
        if (error.message == 'Request failed with status code 404') {
          commit('update_erorr_message', 'Invalid playlist link. You need to check the playlist link.')
        } else {
          commit('update_erorr_message', 'Request failed. Please reload the page.')
        }
      }
    },
    swap_url(
      { commit },
      index: { rand_image_index: number; rand_alternative_image_index: number }
    ): void {
      commit('swap_images', index)
    },
    set_timer({ commit }, new_timer: number): void {
      commit('update_timer', new_timer)
    },
  }
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})
