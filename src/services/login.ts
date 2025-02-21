import axios, { AxiosResponse } from "axios"
const baseUrl = "api/v1/user/login"

interface Icredentials {
  email: string
  password: string
}

const login = async (credentials: Icredentials): Promise<AxiosResponse> => {
  const response: AxiosResponse = await axios.post(baseUrl, credentials)
  return response
}

export default { login }
