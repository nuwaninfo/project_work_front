import { BrowserRouter, Route, Routes } from "react-router"
import NavBar from "./NavBar"
import Body from "./Body"

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} />
        </Routes>
      </BrowserRouter>

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  )
}

export default App
