import { publicRoutes } from "../config/router"
import { ILinkLoop } from "../types"

export const convertObjectToArrayNavLink = (objectArr: any) => {
  const arr = []
  for (const property in objectArr) {
    arr.push({
      path: `${publicRoutes.films}?type=${(objectArr[property] as ILinkLoop).slug}`,
      label: (objectArr[property] as ILinkLoop).title,
      slug:  (objectArr[property] as ILinkLoop).slug
    })
  }

  return arr
}

export const ROLE = {
  USER: 0,
  ADMIN: 1,
}