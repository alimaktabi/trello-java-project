import { Link } from "react-router-dom"
import { BiUserCircle, CgTrello } from "react-icons/all"

const Header = () => {
  return (
    <header className="px-3 py-5 shadow-md text-white flex justify-between align-middle bg-green-500">
      <Link to="/">
        <h3 className="text-2xl text-gray-100 font-semibold flex items-center">
          <CgTrello size="30" className="mr-5" />
          Trello
        </h3>
      </Link>
      <div className="flex font-semibold text-lg">
        <span className="mx-5">Workspaces</span>
        <span className="mx-5">Boards</span>
      </div>

      <div className="flex align-middle font-semibold mr-5 border-green-100 border-solid border-2 rounded-md">
        <Link
          to="/login"
          className="hover:bg-white px-3 py-1 hover:text-black transition-all delay-100"
        >
          {/* <BiUserCircle size="30" /> */}
          Login
        </Link>{" "}
        <Link
          to="/register"
          className="px-3 py-1 border-l-2 border-green-100 border-solid hover:bg-white hover:text-black transition-all delay-100"
        >
          {/* <BiUserCircle size="30" /> */}
          Register
        </Link>
      </div>
    </header>
  )
}

export default Header
