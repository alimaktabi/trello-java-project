import { FC } from "react"
import { Control } from "react-hook-form"
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa"
import { sort, Task } from ".."
import Button from "../../../../components/Button"
import Text from "../../../../components/Form/Text"
import TaskComponent from "../task"

export type Props = {
  control: Control<any>
  name: string
  tmp?: boolean
  loading?: boolean
  id?: number
  index: number
  deleteItem: any
  tasks: Task[]
  submitItem: any
  addTask: any
  submitTask: any
  deleteTask: any
  showModal: any
  moveLeft: any
  moveRight: any
  moveBottom: any
}

const State: FC<Props> = ({
  control,
  name,
  index,
  id,
  loading,
  tmp,
  deleteItem,
  submitItem,
  addTask,
  tasks,
  submitTask,
  deleteTask,
  showModal,
  moveLeft,
  moveBottom,
  moveRight,
}) => {
  return !tmp ? (
    <div className="rounded-md flex flex-col font-semibold border-2 border-gray-300 text-center w-80 p-1 bg-gray-100 text-black">
      <p>{name}</p>

      <div className="mt-5 flex-1">
        {sort(tasks, (a, b) => {
          if (!a.orderInt) return -1
          if (!b.orderInt) return 1

          return a.orderInt - b.orderInt
        }).map((item, key) => (
          <TaskComponent
            {...item}
            moveLeft={moveLeft?.bind(null, key, "left")}
            moveRight={moveRight?.bind(null, key, "right")}
            moveBottom={
              key < tasks.length - 1
                ? moveBottom?.bind(null, key, "bottom")
                : undefined
            }
            control={control}
            index={index + "." + key}
            key={key}
            showModal={showModal.bind(null, key)}
            submitTask={submitTask.bind(null, key)}
            deleteTask={deleteTask.bind(null, key)}
          />
        ))}
      </div>

      <small
        onClick={addTask}
        className="hover:bg-green-200 justify-self-end self-center transition-colors delay-100 cursor-pointer px-3 py-1 mt-5 flex items-center rounded-sm"
      >
        <FaPlus className="mr-4" />
        <span className="text-gray-500">Add another item</span>
      </small>
    </div>
  ) : (
    <div className="rounded-md border-2 shadow-md flex items-start text-center w-80 p-3 bg-green-300 text-black">
      <Text label="Title" size="sm" control={control} name={`tmp.${index}`} />
      <Button
        onClick={submitItem.bind(null, index)}
        variant="container"
        size="sm"
        loading={loading}
        color="primary"
        className="ml-3"
      >
        <FaCheck />
      </Button>
      <Button
        size="sm"
        onClick={deleteItem.bind(null, index)}
        variant="container"
        color="error"
        className="ml-3"
      >
        <FaTimes />
      </Button>
    </div>
  )
}

export default State
