import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { useForm } from "react-hook-form"
import { BiTrash } from "react-icons/bi"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../../../components/Button"
import Text from "../../../../components/Form/Text"
import Textarea from "../../../../components/Form/Textarea"
import http from "../../../../utils/http"
import Discussion from "../discussion"

export type Props = {
  children: ReactNode
}

type ModalState = {
  data: any
  isOpen: boolean
  setData: any
}

export const ModalContext = createContext<ModalState>({
  data: {},
  isOpen: false,
  setData: () => {},
})

const Modal: FC<Props> = ({ children }) => {
  const { control, getValues, reset, watch, setValue } = useForm<any>({
    defaultValues: {
      isOpen: false,
    },
  })

  const navigate = useNavigate()

  const ref = useRef<HTMLDivElement>(null)

  const params = useParams()

  const isOpen = watch("isOpen")

  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    http.get("/accounts/board/" + params.id).then((res) => {
      setUsers(res.data)
    })

    if (!isOpen) return
  }, [isOpen])

  const updateTask = () => {
    setLoading(true)

    const data = getValues()

    if (data.assignedTo) {
      data.assignedTo = data.assignedTo.map((item: any) => {
        return JSON.parse(item)
      })
    }

    http.post("/tasks/" + getValues("board_id"), data).then((res) => {
      setLoading(false)
      setValue("isOpen", false)
    })
  }

  const callback = (data: any) => {
    setValue("discussions", [...(getValues("discussions") || []), data])
  }

  return (
    <>
      <div
        onClick={(e) => {
          if (!isOpen || ref.current?.contains(e.target as any)) return
          setValue("isOpen", false)
        }}
        className={`fixed inset-0 z-10 transition-all delay-100 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "#ffffffa0" }}
      >
        <div
          ref={ref}
          className="absolute bottom-1/2 right-1/2 inset-0 translate-x-1/2 translate-y-1/2 py-10 px-5 bg-white border border-gray-300 shadow-md rounded-md flex gap-3 overflow-y-auto"
        >
          <div className="flex-1">
            <Text control={control} name="name" label="Title" />
            <Textarea
              control={control}
              name="description"
              label="Description"
              className="mt-10"
            />
            <div className="mt-16">
              <p>Assigned To</p>
              <select
                multiple
                {...control.register("assignedTo")}
                className="overflow-hidden border border-gray-400 bg-gray-100 outline-none rounded-md p-3"
              >
                {users.map((item, key) => (
                  <option key={key} value={JSON.stringify(item)}>
                    {item.firstName + " " + item.lastName}
                  </option>
                ))}
              </select>

              <div className="mt-3">
                <h3 className="font-semibold text-xl">Discussion</h3>
                {watch("discussions")?.map((item: any, key: number) => (
                  <div
                    className="p-3 border bg-gray-100 border-gray-300"
                    key={key}
                  >
                    <div className="flex justify-between">
                      <p>{item.content}</p>
                      <BiTrash />
                    </div>
                    <small className="text-gray-600 block mt-4">
                      {item.user.firstName + " " + item.user.lastName} said
                    </small>
                  </div>
                ))}

                <Discussion callback={callback} />
              </div>
            </div>
            <div className="text-right mt-10 pb-5">
              <Button
                loading={loading}
                onClick={updateTask}
                color="primary"
                variant="container"
              >
                Submit
              </Button>
            </div>
          </div>
          <div></div>
        </div>
      </div>

      <ModalContext.Provider
        value={{
          data: getValues(),
          setData: (data: any) => {
            reset({
              ...data,
              assignedTo: (data.assignedTo || []).map((item: any) =>
                JSON.stringify(item)
              ),
            })
          },
          isOpen,
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  )
}

export default Modal
