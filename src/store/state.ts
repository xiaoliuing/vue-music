export interface State {
  singer: {};
  playing: boolean;
  fullScreen: boolean;
  playList: Array<any>;
  sequenceList: Array<any>;
  mode: number;
  currentIndex: number
}

const state: State = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: 0,
  currentIndex: -1
}

export default state