import { Control, useController } from "react-hook-form"
import Styles from "./text.module.sass"
import { ReactNode, useState } from "react"
import Errors from "../Errors"
import { MdError } from "react-icons/all"

type Props = {
  control: Control<any>
  name: string
  label?: string | ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
  type?: "text" | "password" | "number"
}

const Text = ({
  control,
  name,
  label,
  className,
  size,
  type,
}: Props): JSX.Element => {
  const {
    field: { onChange, ref, onBlur, value },
    fieldState: { error },
  } = useController({ control, name })

  const [active, setActive] = useState(false)

  return (
    <div
      className={`${Styles.container} border-solid  bg-white  ${
        value ? Styles.active : ""
      } ${active ? Styles.focus : ""} ${error ? Styles.error : ""} ${
        Styles[`${size}`]
      } ${className}`}
    >
      <label>
        <span>{label}</span>
        <input
          onFocus={setActive.bind(null, true)}
          type={type}
          ref={ref}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          onBlur={() => {
            setActive(false)
            onBlur()
          }}
        />
        <Errors messages={error} />
        {error && <MdError />}
      </label>
    </div>
  )
}

Text.defaultProps = {
  className: "",
  size: "lg",
  type: "text",
}

export default Text
