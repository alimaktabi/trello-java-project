import { useState } from "react"
import { useParams } from "react-router-dom"

export type Props = {}

const TabHeader = ({}) => {}

const Settings = () => {
  const params = useParams()

  const [tabIndex, setTabIndex] = useState(0)

  return (
    <div className="p-5 mt-10">
      <header className="flex justify-evenly items-center">
        <h6
          className={`font-semibold ${
            tabIndex === 0 ? "border-b-4 pb-4 border-green-600" : ""
          }`}
        >
          Collaboration
        </h6>
        <h6 className="font-semibold">Permissions</h6>
      </header>
    </div>
  )
}

export default Settings
