import * as TYPES from './mutation-types'
import { ActionTree } from 'vuex'

const actions: ActionTree<any, any> = {
  setSinger({ commit }, payload) {
    console.log('singer')
    commit(TYPES.SET_SINGRT, payload)
  }
}

export default actions