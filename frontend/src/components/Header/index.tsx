import { Link } from "react-router-dom"
import { BiUserCircle } from "react-icons/all"

const Header = () => {
  return (
    <header className="px-3 py-5 shadow-md text-white flex justify-between align-middle bg-green-500">
      <Link to="/">
        <h3 className="text-2xl text-gray-100">Trello</h3>
      </Link>
      <div className="flex font-semibold text-lg">
        <span className="mx-5">Workspaces</span>
        <span className="mx-5">Boards</span>
      </div>

      <div className="flex">
        <Link to="/login">
          <BiUserCircle size="30" />
        </Link>
      </div>
    </header>
  )
}

export default Header
