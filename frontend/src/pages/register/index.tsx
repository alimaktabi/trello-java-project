import { useForm } from "react-hook-form"
import Styles from "./styles.module.sass"
import Text from "../../components/Form/Text"
import { Link } from "react-router-dom"
import Button from "../../components/Button"
import { CgTrello } from "react-icons/all"

const Login = () => {
  const { control } = useForm()

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
        <h5
          className="font-semibold text-2xl flex align-middle"
          style={{ marginLeft: "-20px" }}
        >
          <CgTrello size="30" className="mr-5 mt-1" />
          <span>Trello | Register</span>
        </h5>
        <div className="text-center">
          <hr className="mt-4 mb-2" />
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
        </div>

        <p className="mt-4 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link className="text-green-500" to="/login">
            Login
          </Link>
        </p>
        <div className="flex justify-end mt-5">
          <Button color="primary">Register</Button>
        </div>
      </div>
    </div>
  )
}

export default Login
