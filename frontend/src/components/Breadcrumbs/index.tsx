import { FC, ReactNode } from "react"
import { BiHome } from "react-icons/bi"
import { FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"
import Styles from "./styles.module.sass"

type BreadcrumbItem = {
  label: string | ReactNode
  href?: string
}

export type Props = {
  paths: BreadcrumbItem[]
}

const Breadcrumbs: FC<Props> = ({ paths }) => {
  return (
    <div className="shadow-md rounded-md border-2 mb-5 text-white border-gray-300 font-semibold inline-flex items-center">
      <Link
        className="bg-green-500 p-3 inline-flex items-center rounded-l-md border-r-4 border-green-300 border-solid"
        to="/"
      >
        <FaHome size="20" className="mr-3" />
        Home
      </Link>
      {paths.map((item, index) =>
        item.href ? (
          <Link
            className={`bg-green-500 p-3  ${
              index === paths.length - 1 ? "rounded-r-md" : ""
            }`}
            to={item.href}
            key={index}
          >
            {item.label}
          </Link>
        ) : (
          <span className={`${Styles["item"]} ${Styles["active"]}`} key={index}>
            {item.label}
          </span>
        )
      )}
    </div>
  )
}

export default Breadcrumbs
