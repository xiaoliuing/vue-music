import * as TYPES from './mutation-types'
import { ActionTree } from 'vuex'

const actions: ActionTree<any, any> = {
  setSinger({ commit }, payload) {
    commit(TYPES.SET_SINGRT, payload)
  },
  selectPlayer({ commit }, { list, index }) {
    console.log(list, index)
    commit(TYPES.SET_SQUENCE_LIST, list)
    commit(TYPES.SET_PLAY_LIST, list)
    commit(TYPES.SET_CURRENT_INDEX, index)
    commit(TYPES.SET_FULLSCREEN, true)
    commit(TYPES.SET_PLAYING, true)
  },
  updateFullScreen({ commit }, flag: boolean) {
    commit(TYPES.SET_FULLSCREEN, flag)
  }
}

export default actions