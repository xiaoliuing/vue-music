import axios from 'axios'
import config from '../config'

const { HOST, PORT, ERR_OK } = config
const baseURL = `${HOST}:${PORT}`

declare module 'axios' { // 解决 Property 'code' does not exist on type 'AxiosResponse<any>'.错误
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}

export const request = (url: string, options?: any) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      baseURL,
      url,
      ...options
    }).then(res => {
      const { status } = res
      if (status === ERR_OK) {
        resolve(res)
      } else {
        reject('服务器出错....')
      }
    }).catch(err => {
      reject(`ERROR::: ${err}`)
    })
  })
}
