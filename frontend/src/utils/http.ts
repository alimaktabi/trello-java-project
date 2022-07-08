import axios from "axios"

const http = axios.create({
  baseURL: "http://localhost:8080",
  onUploadProgress: () => {},
  withCredentials: true,
})

export default http
