import { CgTrello } from "react-icons/cg"
import Styles from "../register/styles.module.sass"
import Text from "../../components/Form/Text"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import http from "../../utils/http"
import Button from "../../components/Button"
import { useUser } from "../../App"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const { control, handleSubmit, reset, setError, watch } = useForm()

  const [logoutLoading, setLogoutLoading] = useState(false)

  const [loading, setLoading] = useState(false)

  const user = useUser()

  const navigate = useNavigate()

  useEffect(() => {
    http.get("/accounts/me").then((res) => {
      reset({ ...res.data, password: null })
    })
  }, [])

  const submit = (data: any) => {
    if (data.password !== data.passwordConfirmation) {
      setError("password", {
        type: "required",
        message: "Password and confirmation do not match",
      })
      return
    }
    setLoading(true)

    const formData = new FormData()

    const { photo, ...rest } = data

    Object.keys(rest).forEach((key) => {
      formData.append(key, data[key])
    })

    formData.append("photo", photo[0])

    http
      .post("/accounts/update", formData, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      })
      .then((res) => {
        user.login(res.data)

        navigate("/dashboard")
      })
  }

  const logoutUser = () => {
    setLogoutLoading(true)

    http.post("/accounts/logout").then(() => {
      user.logout()
      navigate("/login")
    })
  }

  return (
    <div className="p-10">
      <div className="text-right">
        <Button
          disabled={logoutLoading}
          onClick={logoutUser}
          variant="container"
          color="error"
        >
          Logout
        </Button>
      </div>
      <div className={`${Styles.container} items-start mt-10`}>
        <div className="bg-white shadow-md rounded-md px-10 py-5">
          <h5
            className="font-semibold text-2xl flex align-middle"
            style={{ marginLeft: "-20px" }}
          >
            <CgTrello size="30" className="mr-5 mt-1" />
            <span>Edit Profile</span>
          </h5>
          <div className="text-center">
            <hr className="mt-4 mb-2" />
          </div>
          <div>
            {watch("image") && (
              <img
                src={"http://localhost:8080" + watch("image")}
                className="mx-auto rounded-full border border-gray-300"
                alt="user profile"
                width={150}
                height={150}
              />
            )}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10">
            <Text control={control} name="firstName" label="First Name" />
            <Text control={control} name="lastName" label="Last Name" />

            <Text control={control} name="email" label="Email" />
            <Text control={control} name="phoneNumber" label="Phone Number" />
            <Text
              control={control}
              type="password"
              name="password"
              label="Password"
            />
            <Text
              control={control}
              type="password"
              name="passwordConfirmation"
              label="Password Confirmation"
            />
            <input
              type="file"
              accept="image/*"
              {...control.register("photo")}
            />
          </div>
          <div className="flex justify-end mt-10">
            <Button
              loading={loading}
              onClick={handleSubmit(submit)}
              color="primary"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
