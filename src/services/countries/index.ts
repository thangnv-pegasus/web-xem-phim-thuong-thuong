import { http } from "../../config/axios"
import { IBaseReponse, ICountry } from "../../types"

export const getAllCountries = async (): Promise<ICountry[]> => {
  const res = await http.get('/countries/all')

  return res.data
}