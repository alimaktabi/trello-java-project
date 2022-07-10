import { useContext, useEffect, useState } from "react"
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import http from "../../../utils/http"
import Text from "../../../components/Form/Text"
import { useForm } from "react-hook-form"
import Button from "../../../components/Button"
import State from "./state"
import Modal, { ModalContext } from "./modal"

export type State = {
  id?: number
  name: string
  loading?: boolean
  tmp?: boolean
  orderInt: number
  tasks: Task[]
}

export type Board = {
  name: string
  id: number
  color: string
  states: State[]
}

export type Task = {
  id?: number
  loading?: boolean
  tmp?: boolean
  name: string
  description: string
  orderInt?: number
}

export const sort = <T,>(array: T[], callback: (x: T, y: T) => any): T[] => {
  array.sort(callback)
  return array
}

const Board = () => {
  const params = useParams()

  const { control, getValues, setValue, setError } = useForm()

  const modalContext = useContext(ModalContext)

  const [board, setBoard] = useState<Board>({
    name: "",
    id: 0,
    states: [],
    color: "",
  })

  useEffect(() => {
    let isMounted = true

    if (modalContext.isOpen) return

    http.get("/boards/" + params.id).then((res) => {
      if (!isMounted) return

      setBoard(res.data)
    })

    return () => {
      isMounted = false
    }
  }, [modalContext.isOpen])

  const addItem = () => {
    setBoard({
      ...board,
      states: [
        ...board.states,
        { name: "", tmp: true, orderInt: board.states.length + 1, tasks: [] },
      ],
    })
  }

  const addTask = (index: number) => {
    board.states[index].tasks.push({
      name: "",
      tmp: true,
      loading: false,
      description: "",
      orderInt: board.states[index].tasks.length + 1,
    })

    setBoard({
      ...board,
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

  const submitTask = (stateIndex: number, taskIndex: number) => {
    const task = board.states[stateIndex].tasks[taskIndex]
    task.loading = true
    task.name = getValues("task." + stateIndex + "." + taskIndex)

    setBoard({ ...board })

    http.post("/tasks/" + board.states[stateIndex].id, task).then((res) => {
      if (res.data === null) return

      board.states[stateIndex].tasks[taskIndex] = res.data

      setBoard({ ...board })
    })
  }

  const deleteTask = (stateIndex: number, taskIndex: number) => {
    const task = board.states[stateIndex].tasks[taskIndex]

    if (task.id) {
      task.loading = true
      setBoard({ ...board })

      http
        .post("/tasks/" + board.states[stateIndex].id + "/delete", task)
        .then(() => {
          board.states[stateIndex].tasks.splice(taskIndex, 1)
          setBoard({ ...board })
        })

      return
    }

    board.states[stateIndex].tasks.splice(taskIndex, 1)
    setBoard({ ...board })
  }

  const showModal = (stateIndex: number, taskIndex: number) => {
    modalContext.setData({
      ...board.states[stateIndex].tasks[taskIndex],
      board_id: board.states[stateIndex].id,
      isOpen: true,
    })
  }

  const move = (index: number, key: number, movement: string) => {
    switch (movement) {
      case "right": {
        const item = board.states[index].tasks[key]

        board.states[index].tasks.splice(key, 1)

        board.states[index + 1].tasks.push(item)

        break
      }

      case "left": {
        const item = board.states[index].tasks[key]

        board.states[index].tasks.splice(key, 1)

        board.states[index - 1].tasks.push(item)

        break
      }

      case "bottom": {
        const tmp = board.states[index].tasks[key]

        board.states[index].tasks[key] = board.states[index].tasks[key + 1]

        board.states[index].tasks[key + 1] = tmp

        let orderIndex = 1
        for (const task of board.states[index].tasks) {
          task.orderInt = orderIndex++
        }

        break
      }
    }
    const submittion = { ...board }

    setBoard(submittion)

    http.post("/boards/update", submittion).then((res) => {
      setBoard(res.data)
    })
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
      <div className="flex gap-4 mx-5 mt-3 h-screen">
        {sort(board.states, (a, b) => a.orderInt - b.orderInt).map(
          (item, key) => (
            <div key={key}>
              <State
                {...item}
                index={key}
                control={control}
                moveRight={
                  key < board.states.length - 1
                    ? move.bind(null, key)
                    : undefined
                }
                moveLeft={key > 0 ? move.bind(null, key) : undefined}
                moveBottom={move.bind(null, key)}
                submitItem={submitItem}
                deleteItem={deleteTemp}
                showModal={showModal.bind(null, key)}
                addTask={addTask.bind(null, key)}
                submitTask={submitTask.bind(null, key)}
                deleteTask={deleteTask.bind(null, key)}
              />
            </div>
          )
        )}
        <div className="flex items-start">
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

const BoardWrapper = () => (
  <Modal>
    <Board />
  </Modal>
)

export default BoardWrapper
