import { Request, Response } from "express"
import accountIndustries from "./data/Account Industry.json"
import { IAcctIndustryValues, IResponseType } from "./interfaces"
import { calculateNormalizePercentages } from "./utils/normalizePercentage"

export const getAccountIndustry = async (req: Request, res: Response) => {
  const requiredResponse: IResponseType = {}

  accountIndustries.forEach((item) => {
    const quarter = item.closed_fiscal_quarter
    const industry = item.Acct_Industry
    const acv = item.acv
    const count = item.count

    if (!requiredResponse[quarter]) {
      requiredResponse[quarter] = {
        [industry]: {
          total_acv: acv,
          total_count: count,
        },
      }
    } else {
      if (
        !requiredResponse[quarter as keyof IResponseType].hasOwnProperty(
          industry
        )
      ) {
        requiredResponse[quarter as keyof IResponseType][industry] = {
          total_acv: acv,
          total_count: count,
        }
      } else {
        requiredResponse[quarter as keyof IResponseType][industry] = {
          total_acv:
            (requiredResponse[quarter][industry] as IAcctIndustryValues)
              .total_acv + acv,
          total_count:
            (requiredResponse[quarter][industry] as IAcctIndustryValues)
              .total_count + count,
        }
      }
    }
  })

  // Calculate acv and count percentages for each industry in each quarter
  Object.keys(requiredResponse).forEach((quarter) => {
    const industries = Object.keys(requiredResponse[quarter])
    const industryDataList = industries.map(
      (industry) => requiredResponse[quarter][industry]
    )

    const acvList = industryDataList.map((item) => item.total_acv)
    const countList = industryDataList.map((item) => item.total_count)

    const acvPercents = calculateNormalizePercentages(acvList)
    const countPercents = calculateNormalizePercentages(countList)

    industries.forEach((industry, index) => {
      const industryData = requiredResponse[quarter][industry]
      industryData.percentage_of_acv = acvPercents[index]
      industryData.percentage_of_count = countPercents[index]
    })
  })

  res.status(200).json(requiredResponse)
}
