import { BrowserRouter, Route, Routes } from "react-router"

import Body from "./components/Body"
import Login from "./components/Login"
import Register from "./components/Register"
import KanbanBoard from "./components/KanbanBoard"
import { useState } from "react"

function App() {
  const [column, setColumn] = useState([])

  const handleClick = () => {
    console.log("dd")
  }

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<Login />} />
            <Route
              path="home"
              element={<KanbanBoard handleClick={handleClick} />}
            />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
