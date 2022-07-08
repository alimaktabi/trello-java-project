import { createContext, useContext, useState } from "react"

import Header from "./components/Header"

import { Routes } from "./routes"
import { useLocation } from "react-router-dom"
import { LoginUser, LogoutUser, user } from "./utils/user"

export const UserContext = createContext({
  value: user,
  logout: () => {},
  login: (data: any) => {},
})

export const useUser = () => useContext(UserContext)

function App() {
  const [auth, setAuth] = useState(user)

  const login = (data: any) => {
    LoginUser(data)
    setAuth(data)
  }

  const logout = () => {
    LogoutUser()
    setAuth(null)
  }

  return (
    <UserContext.Provider
      value={{
        value: auth,
        login,
        logout,
      }}
    >
      <div className="bg-neutral-50 h-screen">
        <Header />
        <Routes />
      </div>
    </UserContext.Provider>
  )
}

export default App
