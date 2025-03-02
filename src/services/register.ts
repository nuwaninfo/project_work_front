import axios, { AxiosResponse } from "axios"

const baseUrl = "api/v1/user/register"

interface Icredentials {
  email: string
  password: string
}

interface IResponse {
  user: string
  msg: string
  status: string
}

const register = async (credentials: Icredentials): Promise<AxiosResponse> => {
  const response: AxiosResponse<IResponse> = await axios.post(
    baseUrl,
    credentials
  )
  return response
}

export default { register }
