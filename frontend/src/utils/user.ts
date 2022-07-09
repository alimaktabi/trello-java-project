import { useContext } from "react"
import { UserContext } from "../App"

export let user = JSON.parse(localStorage.getItem("auth") || "null")

export const LoginUser = (data: any) => {
  localStorage.setItem("auth", JSON.stringify(data))

  user = data
}

export const LogoutUser = () => {
  user = null

  localStorage.removeItem("auth")
}
