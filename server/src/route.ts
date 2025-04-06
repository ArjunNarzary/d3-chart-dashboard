import express from "express"
import {
  getAccountIndustry,
  getAcvRange,
  getCustomerType,
  getTeams,
} from "./controller"

const router = express.Router()

router.get("/account-industry", getAccountIndustry)
router.get("/acv-range", getAcvRange)
router.get("/customer-type", getCustomerType)
router.get("/team", getTeams)

export default router
