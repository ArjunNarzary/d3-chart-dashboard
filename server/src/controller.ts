import { Request, Response } from "express"
import accountIndustries from "./data/Account Industry.json"
import acvRange from "./data/ACV Range.json"
import customerType from "./data/Customer Type.json"
import team from "./data/Team.json"
import { IAcctIndustryValues, IResponseType } from "./interfaces"
import { calculateNormalizePercentages } from "./utils/normalizePercentage"

const calculatePercentages = (currObj: IResponseType) => {
  Object.keys(currObj).forEach((quarter) => {
    const industries = Object.keys(currObj[quarter])
    const industryDataList = industries.map(
      (industry) => currObj[quarter][industry]
    )

    const acvList = industryDataList.map((item) => item.total_acv)
    const countList = industryDataList.map((item) => item.total_count)

    const acvPercents = calculateNormalizePercentages(acvList)
    const countPercents = calculateNormalizePercentages(countList)

    industries.forEach((industry, index) => {
      const industryData = currObj[quarter][industry]
      industryData.percentage_of_acv = acvPercents[index]
      industryData.percentage_of_count = countPercents[index]
    })
  })
}

const generateRequiredObj = (
  requiredResponse: IResponseType,
  quarter: string,
  type: string,
  acv: number,
  count: number
) => {
  if (!requiredResponse[quarter]) {
    requiredResponse[quarter] = {
      [type]: {
        total_acv: acv,
        total_count: count,
      },
    }
  } else {
    if (
      !requiredResponse[quarter as keyof IResponseType].hasOwnProperty(type)
    ) {
      requiredResponse[quarter as keyof IResponseType][type] = {
        total_acv: acv,
        total_count: count,
      }
    } else {
      requiredResponse[quarter as keyof IResponseType][type] = {
        total_acv:
          (requiredResponse[quarter][type] as IAcctIndustryValues).total_acv +
          acv,
        total_count:
          (requiredResponse[quarter][type] as IAcctIndustryValues).total_count +
          count,
      }
    }
  }

  // Calculate acv and count percentages for each industry in each quarter
  calculatePercentages(requiredResponse)
}

export const getAccountIndustry = async (req: Request, res: Response) => {
  const requiredResponse: IResponseType = {}

  accountIndustries.forEach((item) => {
    const quarter = item.closed_fiscal_quarter
    const industry = item.Acct_Industry
    const acv = item.acv
    const count = item.count

    generateRequiredObj(requiredResponse, quarter, industry, acv, count)
  })

  res.status(200).json(requiredResponse)
}

export const getAcvRange = async (req: Request, res: Response) => {
  const requiredResponse: IResponseType = {}

  acvRange.forEach((item) => {
    const quarter = item.closed_fiscal_quarter
    const acvRange = item.ACV_Range
    const acv = item.acv
    const count = item.count

    generateRequiredObj(requiredResponse, quarter, acvRange, acv, count)
  })

  res.status(200).json(requiredResponse)
}

export const getCustomerType = async (req: Request, res: Response) => {
  const requiredResponse: IResponseType = {}

  customerType.forEach((item) => {
    const quarter = item.closed_fiscal_quarter
    const cusType = item.Cust_Type
    const acv = item.acv
    const count = item.count

    generateRequiredObj(requiredResponse, quarter, cusType, acv, count)
  })

  res.status(200).json(requiredResponse)
}

export const getTeams = async (req: Request, res: Response) => {
  const requiredResponse: IResponseType = {}

  team.forEach((item) => {
    const quarter = item.closed_fiscal_quarter
    const cusType = item.Team
    const acv = item.acv
    const count = item.count

    generateRequiredObj(requiredResponse, quarter, cusType, acv, count)
  })

  res.status(200).json(requiredResponse)
}
