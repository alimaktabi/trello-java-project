import { useState } from "react"
import "./App.css"
import Header from "./components/Header"

import { Routes } from "./routes"
import { useLocation } from "react-router-dom"

function App() {
  return (
    <div className="bg-sky-100">
      <Header />
      <Routes />
    </div>
  )
}

export default App
