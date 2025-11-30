// @ts-nocheck
import { NavLink, useLocation } from "react-router";
import { publicRoutes } from "../../../config/router";
import { buildNavLink, NAV_LINK } from "../../../constants/page";
import MenuDropdown from "../../ui/menu-dropdown";
import { v4 as uuid } from "uuid";
import { getAllCountries } from "../../../services/countries";
import { useEffect, useState } from "react";
import { ICountry } from "../../../types";
import { getAllCategories, ICategory } from "../../../services/categoties";


export default function NavBar() {
  const location = useLocation();
  const [countries, setCountries] = useState<ICountry[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])

  const getCountries = async () => {
    const res = await getAllCountries()

    setCountries(res)
  }

  const getCategories = async () => {
    const res = await getAllCategories()
    
    setCategories(res)
  }

  useEffect(() => {
    getCountries()
    getCategories()
  }, [])

  return (
    <div className="bg-[#2d2d2d] text-white">
      <div className="w-320 mx-auto flex items-stretch">
        <NavLink
          to='/'
          className={
            "h-15 block leading-15 px-4 font-medium " +
            (location.pathname + (location.search ?? "") === '/'
              ? "text-orange-500"
              : "text-white")
          }
        >
          Trang chủ
        </NavLink>
        <NavLink
          to='/films?type=phim-moi'
          className={
            "h-15 block leading-15 px-4 font-medium " +
            (location.pathname + (location.search ?? "") === '/films?type=phim-moi'
              ? "text-orange-500"
              : "text-white")
          }
        >
          Phim mới
        </NavLink>
        <NavLink
          to='/films?type=phim-bo'
          className={
            "h-15 block leading-15 px-4 font-medium " +
            (location.pathname + (location.search ?? "") === '/films?type=phim-bo'
              ? "text-orange-500"
              : "text-white")
          }
        >
          Phim bộ
        </NavLink>
        <NavLink
          to='/films?type=phim-le'
          className={
            "h-15 block leading-15 px-4 font-medium " +
            (location.pathname + (location.search ?? "") === '/films?type=phim-le'
              ? "text-orange-500"
              : "text-white")
          }
        >
          Phim lẻ
        </NavLink>
        <MenuDropdown
          menuItems={categories.map((item) => ({label: item.name, path: `/films?type=${item.slug}`}))}
          title='Thể loại'
          key={uuid()}
        />
        <MenuDropdown
          menuItems={countries.map(item => ({path: `/films?type=${item.slug}`, label: item.name}))}
          title='Quốc gia'
          key={uuid()}
          
        />
      </div>
    </div>
  );
}
