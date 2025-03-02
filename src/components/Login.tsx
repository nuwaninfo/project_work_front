import { FC, useState } from "react"
import loginService from "../services/login"
import { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

interface ICredentials {
  email: string
  password: string
}

interface IResponse {
  success: boolean
  token: string
}

const Login: FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const credentials: ICredentials = { email, password }
      const user: AxiosResponse<IResponse> | undefined =
        await loginService.login(credentials)

      // store the token in local/browser storage
      localStorage.setItem("token", user.data.token)

      navigate("/home")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="shadow-xl card bg-base-200 w-[30rem]">
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
              type="password"
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
