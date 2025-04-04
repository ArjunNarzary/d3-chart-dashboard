import express from "express"
import { getAccountIndustry } from "./controller"

const router = express.Router()

router.get("/account-industry", getAccountIndustry)

export default router
