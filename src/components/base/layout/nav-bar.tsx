// @ts-nocheck
import { NavLink, useLocation } from "react-router";
import { publicRoutes } from "../../../config/router";
import { NAV_LINK } from "../../../constants/page";
import MenuDropdown from "../../ui/menu-dropdown";
import { v4 as uuid } from "uuid";

const menuLists = [
  {
    path: publicRoutes.home,
    label: "Trang chủ",
    child: null,
  },
];

for (const key in NAV_LINK) {
  menuLists.push({
    path: `${publicRoutes.films}?type=${NAV_LINK[key].slug}`,
    label: NAV_LINK[key].title ?? NAV_LINK[key].label ?? 'Chưa có tiêu đề',
    child: NAV_LINK[key].child ?? undefined,
  });
}

export default function NavBar() {
  const location = useLocation();

  return (
    <div className="bg-[#2d2d2d] text-white">
      <div className="w-320 mx-auto flex items-stretch">
        {menuLists.map((item, index) => {
          if (item.child) {
            return (
              <MenuDropdown
                menuItems={item.child}
                title={item.label}
                key={uuid()}
              />
            );
          }

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
