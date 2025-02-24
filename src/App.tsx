import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import Body from "./components/Body"
import Login from "./components/Login"
import Register from "./components/Register"
import KanbanBoard from "./components/KanbanBoard"
import kanbanBoardService from "./services/kanbanBoardService"
import tokenService from "./services/token"
import { useState } from "react"
import { AxiosResponse } from "axios"

interface ApiResponse {
  columnCount: number
}

function App() {
  // Get the column count of Kangan board
  const [columnCount, setColumnCount] = useState<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    // Get the token from local storage when the page loads
    const token: string | null = window.localStorage.getItem("token")

    if (token !== null) {
      //Check the token is valid
      const isTokenValid: Promise<AxiosResponse | undefined> =
        tokenService.validateToken(token)
      console.log(isTokenValid)

      kanbanBoardService.setToken(token)
      //navigate("/home")
    } else {
      //navigate("/login")
    }
  }, [])

  const handleClick = async () => {
    const newColumnCount = columnCount + 1

    try {
      const newObj: { columnCount: number } = { columnCount: newColumnCount }
      const response: AxiosResponse<ApiResponse> =
        await kanbanBoardService.create(newObj)

      // Check if response.data exists and has columnCount
      if (response && typeof response.data.columnCount === "number") {
        setColumnCount(response.data.columnCount)
      } else {
        console.error("Invalid response format:", response)
      }
    } catch (error) {
      console.error("Error during API call:", error)
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="login" element={<Login />} />
          <Route
            path="home"
            element={
              <KanbanBoard
                handleClick={handleClick}
                columnCount={columnCount}
              />
            }
          />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
