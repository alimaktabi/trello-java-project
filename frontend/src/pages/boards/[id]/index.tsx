import { useEffect, useState } from "react"
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import http from "../../../utils/http"
import Text from "../../../components/Form/Text"
import { useForm } from "react-hook-form"
import Button from "../../../components/Button"

export type State = {
  id?: number
  name: string
  loading?: boolean
  tmp?: boolean
  order: number
}

export type Board = {
  name: string
  id: number
  color: string
  states: State[]
}

const Board = () => {
  const params = useParams()

  const { control, getValues, setValue, setError } = useForm()

  const [board, setBoard] = useState<Board>({
    name: "",
    id: 0,
    states: [],
    color: "",
  })

  useEffect(() => {
    let isMounted = true
    http.get("/boards/" + params.id).then((res) => {
      if (!isMounted) return

      setBoard(res.data)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const addItem = () => {
    setBoard({
      ...board,
      states: [
        ...board.states,
        { name: "", tmp: true, order: board.states.length },
      ],
    })
  }

  const submitItem = (index: number) => {
    const states = [...board.states]

    states[index].loading = true
    states[index].name = getValues("tmp." + index)

    if (!states[index].name) return

    setBoard({ ...board, states })

    http.post("/states/" + params.id, states[index]).then((res) => {
      states[index] = res.data
      setBoard({ ...board, states })
      setValue("tmp." + index, "")
    })
  }

  const deleteTemp = (index: number) => {
    const states = [...board.states]

    states.splice(index, 1)
    setValue("tmp." + index, "")

    setBoard({ ...board, states })
  }

  return (
    <div>
      <div
        role="header"
        className="border-b-2 border-gray-300 shadow-sm text-xl bg-green-600 text-white p-3"
      >
        <div className="h-10 container mr-auto flex items-center justify-between">
          <p>{board.name}</p>
          <Link to={"/boards/" + params.id + "/settings"}>Settings</Link>
        </div>
      </div>
      <div className="flex gap-4 align-center mx-5 mt-3">
        {board.states.map((item, key) =>
          !item.tmp ? (
            <div
              key={key}
              className="rounded-md font-semibold border-2 border-gray-300 text-center w-80 p-1 bg-gray-100 text-black"
            >
              <p>{item.name}</p>

              <small className="hover:bg-green-200 transition-colors delay-100 cursor-pointer px-3 py-1 mt-5 flex items-center rounded-sm">
                <FaPlus className="mr-4" />
                <span className="text-gray-500">Add another item</span>
              </small>
            </div>
          ) : (
            <div
              key={key}
              className="rounded-md border-2 shadow-md flex items-center text-center w-80 p-3 bg-green-300 text-black"
            >
              <Text
                label="Title"
                size="sm"
                control={control}
                name={`tmp.${key}`}
              />
              <Button
                onClick={submitItem.bind(null, key)}
                variant="container"
                size="sm"
                loading={item.loading}
                color="primary"
                className="ml-3"
              >
                <FaCheck />
              </Button>
              <Button
                size="sm"
                onClick={deleteTemp.bind(null, key)}
                variant="container"
                color="error"
                className="ml-3"
              >
                <FaTimes />
              </Button>
            </div>
          )
        )}
        <div className="flex items-center">
          <div
            onClick={addItem}
            className="rounded-md cursor-pointer shadow-md text-center w-60 p-3 bg-green-500 justify-center border-2 hover:bg-green-200 hover:text-black transition-all delay-100 border-gray-300 text-white flex items-center"
          >
            <FaPlus size="20" className="mr-4" />
            Add another list
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board
