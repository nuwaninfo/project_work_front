import React, { FC, useState } from "react"
import User from "../services/userService"
import { AxiosResponse } from "axios"

const Login: FC = () => {
  const [email, setEmail] = useState<string>("sameerpa1@yahoo.com")
  const [password, setPassword] = useState<string>("abC123@$")

  const handleLogin = async () => {
    try {
      const user = new User(email, password)
      const res: AxiosResponse | undefined = await user.login()
      console.log(res?.data)
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
              type="text"
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
