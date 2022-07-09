import { useForm } from "react-hook-form"
import Styles from "../../login/styles.module.sass"
import Text from "../../../components/Form/Text"
import Button from "../../../components/Button"
import { useState } from "react"
import Color from "../../../components/Form/Color"
import http from "../../../utils/http"
import { useNavigate } from "react-router-dom"

const Create = () => {
  const { control, handleSubmit } = useForm()

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onSubmit = (data: any) => {
    setLoading(true)
    http.post("/boards/create", data).then((res) => {
      setLoading(false)

      navigate("/dashboard")
    })
  }

  return (
    <div className={Styles.container}>
      <div className="bg-white shadow-md rounded-md px-10 py-5">
        <h5 className="font-semibold text-2xl text-center">Create board</h5>
        <div className="text-center">
          <hr className="mt-4 mb-2" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-3">
          <Text control={control} name="name" label="Board Name" />

          <Color control={control} name="color" label="Color" />
        </div>

        <div className="flex justify-end mt-10">
          <Button
            loading={loading}
            onClick={handleSubmit(onSubmit)}
            color="primary"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Create
