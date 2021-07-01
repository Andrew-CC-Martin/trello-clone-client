import {
  Link,
  useLocation
} from "react-router-dom"

import { Tabs, Tab, AppBar, Toolbar, Typography } from '@material-ui/core'

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
  const { pathname } = useLocation()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography component="h1" variant="h6">trello clone</Typography>
        <Tabs value={pathname}>
          {navLinks.map(({ label, value }) => (
            <Tab key={value} label={label} value={value} component={Link} to={value} />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}
