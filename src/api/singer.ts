import { request } from '../utils/request'

interface SingerITE{
  (id?: any): Promise<any>;
}

export const getSingerList: SingerITE = () => {
  return request('/top/artists')
}

export const getSingerDetail: SingerITE = (id: string) => {
  return request(`/artists?id=${id}`)
}

// export const getSongList: RecommendITE = () => {
//   return request('/personalized');
// }

// export const getNewSongsList: RecommendITE = () => {
//   return request('/personalized/newsong');
// }
