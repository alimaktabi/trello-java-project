import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import http from "../../../../utils/http"

const Collaboration = ({ data, setData }: any) => {
  const [users, setUsers] = useState([])

  const { control, reset, setError, register } = useForm()

  useEffect(() => {
    let isMounted = true

    http.get("/accounts/").then((res) => {
      if (!isMounted) return
      setUsers(res.data)
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div>
      <select {...register("users")}></select>
    </div>
  )
}

export default Collaboration
