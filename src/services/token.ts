import axios, { AxiosResponse } from "axios"
const baseUrl = "api/v1/user/validate-token"

const validateToken = async (
  token: string
): Promise<AxiosResponse | undefined> => {
  try {
    const response: AxiosResponse = await axios.post(baseUrl, { token })
    return response
  } catch (error) {
    console.error("Error", error)
  }
}

export default { validateToken }
