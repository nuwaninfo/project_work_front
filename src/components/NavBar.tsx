import { FC } from "react"
import { Link } from "react-router"
import { useLocation, useNavigate } from "react-router-dom"

const NavBar: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const token: string | null = window.localStorage.getItem("token")

  // Logout functionality
  const handleLogout = () => {
    window.localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="text-xl btn btn-ghost">
          kanban board
        </Link>
      </div>
      <div className="flex-none gap-2">
        {!token ? (
          // Show Login & Register if no token
          <ul className="px-1 menu menu-horizontal">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        ) : (
          // Show User Options if token exists
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
