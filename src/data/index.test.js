import { setApiUrl, apiUrls } from './index'

describe("setApiUrl", () => {
  test("It sets API URL to backend for production mode", () => {
    // set NODE_ENV to "production" to mimic prod environment
    process.env.NODE_ENV = "production"
    const apiUrl = setApiUrl(apiUrls)
    expect(apiUrl).toBe(apiUrls.production)

    // reset NODE_ENV to "test" after test is complete
    process.env.NODE_ENV = "test"
  })

  test("It sets API URL to localhost for local dev", () => {
    process.env.NODE_ENV = "development"
    expect(setApiUrl(apiUrls)).toBe(apiUrls.local)
    process.env.NODE_ENV = "test"
  })

  test("It sets API URL to a different URL in local when REACT_APP_API_URL flag is passed", () => {
    process.env.NODE_ENV = "development"
    const myUrl = "www.banana.com"
    process.env.REACT_APP_API_URL = myUrl
    expect(setApiUrl(apiUrls)).toBe(myUrl)
    process.env.NODE_ENV = "test"
  })
})
