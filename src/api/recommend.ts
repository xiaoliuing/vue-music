import { request } from '../utils/request'

interface RecommendITE{
  (): Promise<any>;
}

export const getBannerList: RecommendITE = () => {
  return request('/banner')
}

export const getSongList: RecommendITE = () => {
  return request('/personalized')
}

export const getNewSongsList: RecommendITE = () => {
  return request('/personalized/newsong')
}
