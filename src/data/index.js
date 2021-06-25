import axios from "axios"

let apiUrl

if (process.env.NODE_ENV === "production") {
  apiUrl = "https://frozen-cliffs-40033.herokuapp.com"
} else {
  apiUrl = process.env.REACT_APP_API_URL
}

export const api = axios.create({
  baseURL: apiUrl
})
