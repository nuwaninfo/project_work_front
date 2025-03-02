import { FC, useState } from "react"

import Alert from "./Alert"
import validator from "validator"
import userService from "../services/register"

import { AxiosResponse } from "axios"

interface ICredentials {
  email: string
  password: string
}

interface IResponse {
  user: string
  msg: string
  status: string
}

interface IError {
  message: string[]
  type: string
}

const Register: FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [reEnterPassword, setReEnterPassword] = useState<string>("")
  const [errors, setErrors] = useState<IError>({ message: [], type: "" })

  const handleRegister = async () => {
    const newErrors: string[] = []
    if (!validator.isEmail(email)) {
      newErrors.push("Invalid email")
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 2,
        minNumbers: 2,
        minSymbols: 2,
        minUppercase: 1,
      })
    ) {
      newErrors.push(
        "Please enter a stong password.\n" +
          "Password leangth should be minmum 8 characters long.\n" +
          "Should have minimum 2 lowercase characters.\n" +
          "Should have minimum 1 uppercase character.\n" +
          "Should have minimum 2 numbers.\n" +
          "Should have minimum 2 symbols"
      )
    }

    if (reEnterPassword === "") {
      newErrors.push("Please retype password.")
    }
    if (reEnterPassword !== "" && password !== reEnterPassword) {
      newErrors.push("Please retype password corrently.")
    }

    setErrors({ message: [...new Set(newErrors)], type: "error" })

    if (newErrors.length === 0) {
      try {
        const credentials: ICredentials = { email, password }
        const response: AxiosResponse<IResponse> = await userService.register(
          credentials
        )
        console.log(response.data)
        if (response.data.status === "success") {
          setEmail("")
          setPassword("")
          setReEnterPassword("")
          newErrors.push("Registration is successful. Please login.")
          setErrors({ message: [...new Set(newErrors)], type: "success" })
        } else if (response.data.status === "error") {
          newErrors.push(response.data.msg)
          setErrors({ message: [...new Set(newErrors)], type: "error" })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="shadow-xl card bg-base-200 w-[30rem]">
        <div className="card-body">
          <h2 className="justify-center card-title">Register</h2>
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
              type="password"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="flex items-center gap-2 input input-bordered">
            Retype Password
            <input
              type="password"
              className="grow"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
            />
          </label>
          <div className="justify-center card-actions">
            <button className="btn btn-primary" onClick={handleRegister}>
              Register
            </button>
          </div>
          {errors.message.length > 0 ? (
            <Alert errorMsg={errors.message} type={errors.type} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default Register
