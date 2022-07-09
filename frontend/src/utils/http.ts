import axios from "axios"
import { toast } from "react-toastify"

const http = axios.create({
  baseURL: "http://localhost:8080",
  onUploadProgress: () => {},
  withCredentials: true,
})

http.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 400) {
      error.setValidations = (setError: any) => {
        error.response.data?.errors.forEach(
          (item: { defaultMessage: string; field: string }) => {
            setError(item.field, { message: item.defaultMessage })
          }
        )
      }
    } else {
      error.setValidations = () => {}
    }

    if (error.response?.status === 500) {
      toast(error.response.data.message, { type: "error" })
    }

    throw error
  }
)

export default http
