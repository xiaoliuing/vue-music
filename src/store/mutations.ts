import * as TYPES from './mutation-types'
import { MutationTree } from 'vuex'

const mutations: MutationTree<any> = {
  [TYPES.SET_SINGRT](state, singer: {}) {
    console.log(singer)
    state.singer = singer
  }
}

export default mutations