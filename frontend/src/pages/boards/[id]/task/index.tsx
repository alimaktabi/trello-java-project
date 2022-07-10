import { FC } from "react"
import { Control } from "react-hook-form"
import { BiTrash } from "react-icons/bi"
import { BsArrowDown, BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { FaAngleRight, FaCheck, FaTimes } from "react-icons/fa"
import { RiAlignRight } from "react-icons/ri"
import { Task as TaskProps } from ".."
import Button from "../../../../components/Button"
import Text from "../../../../components/Form/Text"

export type Props = TaskProps & { control: Control; index: string } & any

const Task: FC<Props> = ({
  name,
  loading,
  tmp,
  index,
  control,
  submitTask,
  deleteTask,
  date,
  showModal,
  moveLeft,
  moveRight,
  moveBottom,
}) => {
  return tmp ? (
    <div className="m-3 rounded-md border border-gray-300 shadow-sm bg-green-200 p-4">
      <Text control={control} name={"task." + index} label="Title" />

      <div className="mt-5 flex justify-end align-middle">
        <Button
          color="error"
          size="sm"
          onClick={deleteTask}
          variant="container"
          loading={loading}
        >
          <FaTimes />
        </Button>
        <Button
          color="primary"
          onClick={submitTask}
          size="sm"
          loading={loading}
          className="mx-2"
          variant="container"
        >
          <FaCheck />
        </Button>
      </div>
    </div>
  ) : (
    <div
      onDoubleClick={showModal}
      className="m-3 relative pb-9 text-left rounded-sm border border-gray-300 shadow-sm bg-green-300 p-2"
    >
      {moveLeft && (
        <BsArrowLeft
          onClick={moveLeft}
          className="absolute left-2 bottom-1/2 cursor-pointer translate-y-1/2"
        />
      )}
      {moveRight && (
        <BsArrowRight
          onClick={moveRight}
          className="absolute right-2 bottom-1/2 cursor-pointer translate-y-1/2"
        />
      )}

      {moveBottom && (
        <BsArrowDown
          onClick={moveBottom}
          className="absolute bottom-2 right-1/2 cursor-pointer translate-x-1/2"
        />
      )}

      <div className="flex items-center justify-between">
        <p>{name}</p>
        <BiTrash onClick={deleteTask} className="cursor-pointer" />
      </div>
      <div className="mt-20">
        <small className="text-gray-600 text-xs">
          Created at: {new Date(date).toString()}
        </small>
      </div>
    </div>
  )
}

export default Task
