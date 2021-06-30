import axios from "axios"

export const apiUrls = {
  local: "http://localhost:4000",
  production: "https://frozen-cliffs-40033.herokuapp.com"
}

export const setApiUrl = (apiUrls) => {
  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_API_URL || apiUrls.local
  }

  return apiUrls.production
}

const apiUrl = setApiUrl(apiUrls)

const jwt = localStorage.getItem('jwt')

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Authorization": `Bearer ${jwt}`
  }
})
