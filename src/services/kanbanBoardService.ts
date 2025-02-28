import axios, { AxiosResponse } from "axios"
const baseUrl: string = "/api/v1/board/saveColumnCount"
interface ApiResponse {
  columnCount: number
}

let token: string | null = null

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
}

const create = async (newObject: {
  columnCount: number
}): Promise<AxiosResponse<ApiResponse>> => {
  const config = {
    headers: { Authorization: token },
  }

  const response: AxiosResponse<ApiResponse> = await axios.post(
    baseUrl,
    newObject,
    config
  )
  return response
}

export default { create, setToken }
