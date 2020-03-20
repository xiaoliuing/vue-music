import { Getter } from 'vuex'

export const getSinger: Getter<any, any> = state => state.singer
export const getPlaying: Getter<any, any> = state => state.playing
export const getFullScreen: Getter<any, any> = state => state.fullScreen
export const getPlayList: Getter<any, any> = state => state.playList
export const getSequenceList: Getter<any, any> = state => state.sequenceList
export const getMode: Getter<any, any> = state => state.mode
export const getCurrentIndex: Getter<any, any> = state => state.currentIndex
export const getCurrentSong: Getter<any, any> = state => state.playList[state.currentIndex] || {}