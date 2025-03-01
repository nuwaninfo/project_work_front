import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"

import Body from "./components/Body"
import Login from "./components/Login"
import Register from "./components/Register"
import KanbanBoard from "./components/KanbanBoard"
import kanbanBoardService from "./services/kanbanBoardService"
import tokenService from "./services/token"
import Image from "./components/Image"

import { AxiosResponse } from "axios"

function App() {
  useEffect(() => {
    // Get the token from local storage when the page loads
    const token: string | null = window.localStorage.getItem("token")

    if (token !== null) {
      //Check the token is valid
      const isTokenValid: Promise<AxiosResponse | undefined> =
        tokenService.validateToken(token)
      console.log(isTokenValid)

      kanbanBoardService.setToken(token)
    } else {
      //navigate("/login")
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Image />} />
          <Route path="home" element={<KanbanBoard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
