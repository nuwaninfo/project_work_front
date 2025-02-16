import { Outlet } from "react-router"
import NavBar from "./NavBar"
import { FC } from "react"

const Body: FC = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Body
