import { Control, useController } from "react-hook-form"
import Styles from "./textarea.module.sass"
import { useState } from "react"
import Errors from "../Errors"
import { MdError } from "react-icons/all"

type Props = {
  control: Control<any>
  name: string
  label?: string
  className?: string
  size?: "sm" | "md" | "lg"
}

const Textarea = ({
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
      className={`${Styles.container} ${!!value ? Styles.active : ""} ${
        active ? Styles.focus : ""
      } ${error?.message ? Styles.error : ""} ${
        Styles[`${size}`]
      } ${className}`}
    >
      <label>
        <span>{label}</span>
        <textarea
          onFocus={setActive.bind(null, true)}
          ref={ref}
          value={value ?? ""}
          onChange={onChange}
          onBlur={() => {
            setActive(false)
            onBlur()
          }}
          className="font-normal"
        />
        <Errors messages={error} />
        {error?.message && <MdError />}
      </label>
    </div>
  )
}

Textarea.defaultProps = {
  className: "",
  size: "md",
  type: "text",
}

export default Textarea
