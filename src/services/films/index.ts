import { http } from "../../config/axios"
import { IBaseReponse } from "../../types"
import { IComment } from "../../types/comment"
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

export const postCommentFilm = async (data: {episodeId: number, content: string, userId: number}): Promise<IComment> => { 
  try {
    const res = await http.post(`episode-comment`, data)
    return res.data
  } catch (err) {
    return {} as any
  }
}

export const getCommentsByEpisodeId = async (episodeId: number, page = 1, limit = 12): Promise<IBaseReponse<IComment[]>> => {
  try {
    const res = await http.get(`episode-comment/${episodeId}?page=${page}&limit=${limit}`)
    return res.data
  } catch (err) {
    return {} as any
  }
}