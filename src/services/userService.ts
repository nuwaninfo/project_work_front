import axios, { AxiosResponse } from "axios"

/**
 *
 * @param credentials
 * @returns res
 */
class User {
  baseUrl: string
  email: string
  password: string

  public constructor(email: string, password: string) {
    this.email = email
    this.password = password
    this.baseUrl = "/api/v1/user/login"
  }

  public async login(): Promise<AxiosResponse | undefined> {
    try {
      const response: AxiosResponse | undefined = await axios.post(
        this.baseUrl,
        {
          email: this.email,
          password: this.password,
        }
      )
      return response
    } catch (err) {
      console.error(err)
    }
  }
}
export default User
