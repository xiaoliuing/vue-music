import * as TYPES from './mutation-types'
import { MutationTree } from 'vuex'

const mutations: MutationTree<any> = {
  [TYPES.SET_SINGRT](state, singer) {
    state.singer = singer
  },
  [TYPES.SET_PLAYING](state, flag){
    state.playing = flag
  },
  [TYPES.SET_FULLSCREEN](state, flag){
    state.fullScreen = flag
  },
  [TYPES.SET_PLAY_LIST](state, list){
    state.playList = list
  },
  [TYPES.SET_SQUENCE_LIST](state, list){
    state.sequenceList = list
  },
  [TYPES.SET_PLAY_MODE](state, mode){
    state.mode = mode
  },
  [TYPES.SET_CURRENT_INDEX](state, num){
    state.currentIndex = num
  }
}

export default mutations