import axios from "axios"

// const apiUrl = process.env.REACT_APP_API_URL
let apiUrl
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://stark-mountain-99923.herokuapp.com/"
} else {
  apiUrl = process.env.REACT_APP_API_URL
}

export const api = axios.create({
  baseURL: apiUrl
})
