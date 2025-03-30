import { publicRoutes } from "../config/router"
import { IBaseLink, ILinkLoop } from "../types"

export const convertObjectToArrayNavLink = (objectArr: any) => {
  const arr = []
  for (const property in objectArr) {
    arr.push({
      path: `${publicRoutes.films}?type=${(objectArr[property] as ILinkLoop).slug}`,
      label: (objectArr[property] as ILinkLoop).title
    })
  }

  return arr
}