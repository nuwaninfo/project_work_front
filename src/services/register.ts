import axios, { AxiosResponse } from "axios"

const baseUrl = "api/v1/user/register"

interface Icredentials {
  email: string
  password: string
}

const register = async (credentials: Icredentials): Promise<AxiosResponse> => {
  const response: AxiosResponse = await axios.post(baseUrl, credentials)
  return response.data
}

export default { register }
