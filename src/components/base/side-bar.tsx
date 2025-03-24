import { NavLink, useLocation } from "react-router";
import { publicRoutes } from "../../config/router";
import { NAV_LINK } from "../../constants/page";

const menuLists = [
  {
    path: publicRoutes.home,
    label: "Trang chủ",
  },
  {
    path: `${publicRoutes.films}?type=${NAV_LINK.NEW_FILMS}`,
    label: "Phim mới",
  },
  {
    path: `${publicRoutes.films}?type=${NAV_LINK.FEATURE_FILMS}`,
    label: "Phim lẻ",
  },
  {
    path: `${publicRoutes.films}?type=${NAV_LINK.DRAMA_FILMS}`,
    label: "Phim bộ",
  },
  {
    path: `${publicRoutes.films}?type=${NAV_LINK.CINEMA_FILMS}`,
    label: "Phim đang chiếu",
  },
];

export default function SideBar() {
  const location = useLocation();

  return (
    <div className="bg-[#2d2d2d] text-white">
      <div className="w-320 mx-auto flex items-stretch">
        {menuLists.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              key={`navlink${index}`}
              className={
                "h-15 block leading-15 px-4 font-medium " +
                (location.pathname + (location.search ?? "") === item.path
                  ? "text-orange-500"
                  : "text-white")
              }
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
