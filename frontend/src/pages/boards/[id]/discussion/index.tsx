import { useForm } from "react-hook-form"
import { FaCheck } from "react-icons/fa"
import { useUser } from "../../../../App"
import Button from "../../../../components/Button"
import Textarea from "../../../../components/Form/Textarea"

const Discussion = ({ callback }: { callback: any }) => {
  const { control, handleSubmit, reset } = useForm()

  const user = useUser()

  const submit = (data: any) => {
    callback({ ...data, user: user.value })
    reset({})
  }

  return (
    <div className="mt-10">
      <p>Add comment</p>
      <Textarea
        className="mt-5"
        control={control}
        name="content"
        label="Content"
      />
      <div className="text-right m-3">
        <Button onClick={handleSubmit(submit)} color="primary">
          <FaCheck />
        </Button>
      </div>
    </div>
  )
}

export default Discussion
