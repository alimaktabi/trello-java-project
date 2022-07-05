import Styles from "./errors.module.sass"

type errorProps = {
  message: any
}

const Error = ({ message }: errorProps) => {
  return <small className={Styles.container}>{message}</small>
}

type errorsProps = {
  messages: any
}

const Errors = ({ messages }: errorsProps) => {
  if (!messages || !Object.keys(messages)) return null

  const { ref, ...rest } = messages

  return (
    <>
      {Object.values(rest).map((err, key) => (
        <Error message={err} key={key} />
      ))}
    </>
  )
}

export default Errors
