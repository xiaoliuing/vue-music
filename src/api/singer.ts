import { request } from '../utils/request'

interface SingerITE{
  (): Promise<any>
}

export const getSingerList: SingerITE = () => {
  return request('/top/artists');
}

// export const getSongList: RecommendITE = () => {
//   return request('/personalized');
// }

// export const getNewSongsList: RecommendITE = () => {
//   return request('/personalized/newsong');
// }