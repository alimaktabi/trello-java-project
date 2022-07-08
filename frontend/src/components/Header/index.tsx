import { Link, useLocation } from "react-router-dom"
import { BiUserCircle, CgTrello } from "react-icons/all"
import { useUser } from "../../App"

const Header = () => {
  const userManager = useUser()

  const location = useLocation()

  return (
    <header className="px-3 py-5 shadow-md text-white flex justify-between align-middle bg-green-500">
      <Link to="/">
        <h3 className="text-2xl text-gray-100 font-semibold flex items-center">
          <CgTrello size="30" className="mr-5" />
          Trello
        </h3>
      </Link>
      <div className="flex font-semibold text-lg">
        <Link to="/dashboard" className="mx-5">
          Dashboard
        </Link>
        <span className="mx-5">Workspaces</span>
        <span className="mx-5">Boards</span>
      </div>

      <div className="flex align-middle font-semibold mr-5 border-green-100 border-solid border-2 rounded-md">
        {userManager.value ? (
          <Link
            to="/profile"
            className={`hover:bg-white px-3 py-1 hover:text-black transition-all delay-100 ${
              location.pathname === "/profile" ? "bg-gray-200 text-black" : ""
            }`}
          >
            Profile
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className={`hover:bg-white px-3 py-1 hover:text-black transition-all delay-100 ${
                location.pathname === "/login" ? "bg-gray-200 text-black" : ""
              }`}
            >
              {/* <BiUserCircle size="30" /> */}
              Login
            </Link>{" "}
            <Link
              to="/register"
              className={`hover:bg-white px-3 py-1 hover:text-black transition-all delay-100 ${
                location.pathname === "/register"
                  ? "bg-gray-200 text-black"
                  : ""
              }`}
            >
              {/* <BiUserCircle size="30" /> */}
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
