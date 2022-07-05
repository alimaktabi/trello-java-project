import { useState } from "react"

import Header from "./components/Header"

import { Routes } from "./routes"
import { useLocation } from "react-router-dom"

function App() {
  return (
    <div className="bg-neutral-50 h-screen">
      <Header />
      <Routes />
    </div>
  )
}

export default App
