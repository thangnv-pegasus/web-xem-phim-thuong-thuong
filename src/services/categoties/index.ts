import { http } from "../../config/axios"

export interface ICategory {
  id: number;
  name: string;
  slug: string;
}

export const getAllCategories = async (): Promise<ICategory[]> => {
  const res = await http.get('/categories/list')

  return res.data
}