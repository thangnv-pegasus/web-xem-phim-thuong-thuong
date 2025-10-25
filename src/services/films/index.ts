import { http } from "../../config/axios"
import { IBaseReponse } from "../../types"
import { IFilmHistory } from "../../types/history"

export const getFilmHistories = async (page = 1, limit = 12): Promise<IBaseReponse<IFilmHistory[]>> => {
  const user = JSON.parse(localStorage.getItem('user') || '')
  try {
    const res = await http.get(`film-history/${user?.id}?page=${page}&limit=${limit}`)

    return res.data
  } catch (err) {
    return [] as any
  }
}