import {
  Link,
  useLocation
} from "react-router-dom"

import { Tabs, Tab, Typography, AppBar, Toolbar } from "@material-ui/core"

const navLinks = [
  {
    label: "home",
    value: "/"
  },
  {
    label: "sign up",
    value: "/sign-up"
  },
  {
    label: "sign in",
    value: "/sign-in"
  },
]

export const NavBar = () => {
  let { pathname } = useLocation()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="h1" variant="h6">trello clone</Typography>
        <Tabs value={pathname}>
          {navLinks.map(({ label, value }) => (
            <Tab key={label} label={label} value={value} component={Link} to={value} />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}
