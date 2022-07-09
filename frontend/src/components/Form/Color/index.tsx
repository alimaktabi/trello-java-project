import { Control, useController } from "react-hook-form"
import Styles from "./color.module.sass"
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

const Color = ({
  control,
  name,
  label,
  className,
  size,
}: Props): JSX.Element => {
  const {
    field: { onChange, ref, onBlur, value },
    fieldState: { error },
  } = useController({ control, name })

  const [active, setActive] = useState(false)

  return (
    <div
      className={`${Styles.container} ${Styles.active} ${
        active ? Styles.focus : ""
      } ${error?.message ? Styles.error : ""} ${
        Styles[`${size}`]
      } ${className}`}
    >
      <label>
        {/* <span>{label}</span> */}
        <input
          onFocus={setActive.bind(null, true)}
          type="color"
          ref={ref}
          value={value ?? ""}
          onChange={onChange}
          onBlur={() => {
            setActive(false)
            onBlur()
          }}
        />
        <Errors messages={error} />
        {error?.message && <MdError />}
      </label>
    </div>
  )
}

Color.defaultProps = {
  className: "",
  size: "md",
  type: "text",
}

export default Color
