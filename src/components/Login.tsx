import { FC, useState } from "react"
import loginService from "../services/login"
import { AxiosResponse } from "axios"
import Alert from "./Alert"

const Login: FC = () => {
  const [email, setEmail] = useState<string>("sameerpa1@yahoo.com")
  const [password, setPassword] = useState<string>("abC123@$")

  const handleLogin = async () => {
    try {
      console.log("ddddd")
      const credentials = { email, password }
      const user: AxiosResponse | undefined = await loginService.login(
        credentials
      )
      //const res: AxiosResponse | undefined = await user.login()
      console.log(user.data.token)

      // store the token in local/browser storage
      sessionStorage.setItem("token", user.data.token)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="shadow-xl card bg-base-200 w-96">
        <div className="card-body">
          <h2 className="justify-center card-title">Login</h2>
          <label className="flex items-center gap-2 input input-bordered">
            Email
            <input
              type="email"
              className="grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="flex items-center gap-2 input input-bordered">
            Password
            <input
              type="text"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="justify-center card-actions">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
