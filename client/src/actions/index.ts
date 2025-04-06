const BASE_URL = "http://localhost:8000/api"
export const getData = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const data = await response.json()
  return data
}
