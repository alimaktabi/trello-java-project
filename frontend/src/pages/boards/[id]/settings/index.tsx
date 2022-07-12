import { useState } from "react"
import { useParams } from "react-router-dom"
import Collaboration from "./collaboration"

const components: any[] = [Collaboration]

const Settings = () => {
  const params = useParams()

  const [tabIndex, setTabIndex] = useState(0)

  const [data, setData] = useState<any>({})

  const Component = components[tabIndex]

  return (
    <div className="p-5 mt-10">
      <header className="flex gap-20 justify-center items-center">
        <h6
          onClick={() => setTabIndex(0)}
          className={`font-semibold cursor-pointer pb-4 ${
            tabIndex === 0 ? "border-b-4 border-green-600" : ""
          }`}
        >
          Collaboration
        </h6>{" "}
        <h6
          onClick={() => setTabIndex(1)}
          className={`font-semibold cursor-pointer pb-4 ${
            tabIndex === 1 ? "border-b-4 border-green-600" : ""
          }`}
        >
          Permissions
        </h6>{" "}
        <h6
          onClick={() => setTabIndex(2)}
          className={`font-semibold cursor-pointer pb-4 ${
            tabIndex === 2 ? "border-b-4 border-green-600" : ""
          }`}
        >
          Roles
        </h6>{" "}
        <h6
          onClick={() => setTabIndex(3)}
          className={`font-semibold cursor-pointer pb-4 ${
            tabIndex === 3 ? "border-b-4 border-green-600" : ""
          }`}
        >
          Logs
        </h6>
      </header>

      <main className="mt-6">
        {Component && <Component data={data} setData={setData} />}
      </main>
    </div>
  )
}

export default Settings
