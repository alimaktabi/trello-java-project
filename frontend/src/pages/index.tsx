import { DiJava, DiReact, SiSpringboot } from "react-icons/all"

const Home = () => {
  return (
    <div>
      <h3 className="my-16 font-mono text-center font-semibold text-7xl">
        Trello Project
      </h3>

      <p className="mt-60 ml-5 container font-mono font-semibold text-5xl">
        {/* Technologies used */}
      </p>
      <div className="text-center mt-16 text-green-600 flex justify-center items-center">
        <DiJava size="100" className="mx-10" />
        <SiSpringboot size="100" className="mx-10" />
        <DiReact size="100" className="mx-10" />
      </div>
    </div>
  )
}

export default Home
