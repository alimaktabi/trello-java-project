import { useForm } from "react-hook-form"
import Styles from "./styles.module.sass"
import Text from "../../components/Form/Text"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import { CgTrello } from "react-icons/all"
import { useState } from "react"
import http from "../../utils/http"
import { UserContext, useUser } from "../../App"

const Login = () => {
  const { control, handleSubmit, setError } = useForm()

  const [loading, setLoading] = useState(false)

  const userManager = useUser()

  const navigate = useNavigate()

  const onSubmit = (data: any) => {
    setLoading(true)

    http
      .post("/accounts/login/", data)
      .then((res) => {
        userManager.login(res.data)
        setLoading(false)
        navigate("/dashboard")
      })
      .catch((error) => {
        setLoading(false)

        setError("email", {
          type: "required",
          message: "Your credentials didn't match our record",
        })

        // throw error
      })
  }

  return (
    <div className={Styles.container}>
      <aside className={Styles.area}>
        <ul className={Styles.circles}>
          {Array.from(new Array(10)).map((_, key) => (
            <li key={key} />
          ))}
        </ul>
      </aside>
      <div className="bg-white shadow-md rounded-md px-10 py-5">
        <div className="text-center">
          <CgTrello
            size="30"
            className="mb-5"
            style={{ marginLeft: "-20px" }}
          />
          <h5 className="font-semibold text-3xl">Trello | Login</h5>
          <hr className="mt-8 mb-2" />
          <small className="text-gray-400">
            login to continue using our website
          </small>
        </div>
        <div className="mt-10">
          <Text control={control} name="email" label="Email" />
          <Text
            control={control}
            type="password"
            className="mt-7"
            name="password"
            label="Password"
          />
        </div>

        <p className="mt-4 text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link className="text-green-500" to="/register">
            Register
          </Link>
        </p>
        <div className="flex justify-end mt-5">
          <Button
            loading={loading}
            onClick={handleSubmit(onSubmit)}
            color="primary"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
