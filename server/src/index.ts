import express from "express"
import cors from "cors"
import routes from "./route"

const PORT = 8000
const app = express()
app.use(
  cors({
    origin: "*",
  })
)

app.use(`/`, routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
