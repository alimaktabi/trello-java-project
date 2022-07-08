import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import Styles from "./button.module.sass"
import Loading from "../Loading"

type Props = {
  children: ReactNode
  variant?: "icon" | "container" | "default"
  className?: string
  color?: "primary" | "secondary" | "error" | "warning" | "normal" | "purple"
  onClick?: (e: React.MouseEvent) => void
  onClickCapture?: (e: React.MouseEvent) => void
  submit?: boolean
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

type Shallows = {
  width: string
  left: string
  top: string
  height: string
}

const Button = ({
  children,
  color,
  className,
  variant,
  submit,
  disabled,
  onClick,
  loading,
  size = "md",
  onClickCapture,
  ...props
}: Props): JSX.Element => {
  const [shallows, setShallows] = useState<Shallows[]>([])

  const nodeRef = useRef<any>(null)

  const button = useRef<HTMLButtonElement>(null)

  function mouseDown(event: React.MouseEvent<HTMLButtonElement>): void {
    if (!button.current) return

    const length = Math.max(
      button.current.clientWidth,
      button.current.clientHeight
    )
    setShallows((prev) => {
      if (!button.current) return []

      return [
        ...prev,
        {
          width: `${length}px`,
          height: `${length}px`,
          left: `${event.clientX - button.current.offsetLeft - length / 2}px`,
          top: `${event.clientY - button.current.offsetTop - length / 2}px`,
        },
      ]
    })
  }

  const enterRipple = () => nodeRef.current.classList.add(Styles.active)

  useEffect(() => {
    if (!shallows.length) return

    const timeout = setTimeout(() => {
      setShallows([])
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [shallows])

  return (
    <button
      ref={button}
      className={`${Styles.button} ${Styles[`button-${size}`]} ${
        Styles[color || "normal"]
      } ${Styles[variant || "container"]} ${className}`}
      onMouseDown={mouseDown}
      type={submit ? "submit" : "button"}
      {...props}
      disabled={disabled || loading}
      onClickCapture={onClickCapture}
      onClick={onClick}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          {children}
          <TransitionGroup component={Fragment}>
            {shallows.map((item, key) => (
              <CSSTransition
                unmountOnExit
                nodeRef={nodeRef}
                key={key}
                onEntering={enterRipple}
                timeout={{ enter: 1000, exit: 0 }}
              >
                <div ref={nodeRef} style={item} className={Styles.ripple} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </>
      )}
    </button>
  )
}

Button.defaultProps = {
  className: "",
  submit: false,
  disabled: false,
  onClick: null,
  size: "md",
  loading: false,
}

export default Button
