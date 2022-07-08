import { useState } from "react"
import { FaAngleRight, FaChalkboard, FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import Button from "../../components/Button"
import Styles from "./styles.module.sass"

type Board = {
  name: string
  id: number
  date: number
  image?: string
  membersLength: number
  color: string
}

const defaultBoardData: Board[] = [
  {
    id: 1,
    date: new Date().getTime(),
    membersLength: 3,
    name: "My amazing board",
    color: "floralwhite",
  },
  {
    id: 2,
    date: new Date().getTime(),
    membersLength: 12,
    name: "Board of fun",
    color: "lightblue",
  },
  {
    id: 3,
    date: new Date().getTime(),
    membersLength: 1,
    name: "Personal Board",
    color: "lightgreen",
  },
  {
    id: 4,
    date: new Date().getTime(),
    membersLength: 3,
    name: "White board",
    color: "white",
  },
]

const Dashboard = () => {
  const [boards, setBaords] = useState<Board[]>(defaultBoardData)

  return (
    <div className={Styles.container}>
      <section className="m-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold flex items-center text-3xl">
            <FaChalkboard className="inline mr-5" />
            Boards
          </h3>
          <div className="text-right">
            <Button color="primary" variant="default">
              <FaPlus className="text-green-800" />
            </Button>
          </div>
        </div>
        <div className="mt-16 grid gap-4 grid-cols-5">
          {boards.map((item, key) => (
            <Link
              to={`/boards/${item.id}`}
              style={{ background: item.color }}
              key={key}
              className="py-3 bg-white px-3 shadow-md border-2 border-gray-200 m-3 rounded-md"
            >
              <div className="flex items-start justify-between">
                <p className="font-semibold text-lg">{item.name}</p>
              </div>
              <div className="flex justify-between mt-24 text-gray-600">
                <small>
                  created at {new Date(item.date).toLocaleDateString()}{" "}
                  {/* {new Date(item.date).toLocaleTimeString()} */}
                </small>
                <small>{item.membersLength} members</small>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
