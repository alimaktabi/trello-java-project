import { FC, Fragment } from "react"
import { BrowserRouter, Routes as RouteRoot, Route } from "react-router-dom"

const ROUTES = import.meta.globEager("/src/pages/**/[a-z[]*.tsx")

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1")

  return { path, component: ROUTES[route].default }
})

export const Routes = () => {
  return (
    <RouteRoot>
      {routes.map(
        ({
          path,
          component: Component = Fragment,
        }: {
          path: string
          component: FC
        }) => (
          <Route key={path} path={path} element={<Component />} />
        )
      )}
    </RouteRoot>
  )
}
