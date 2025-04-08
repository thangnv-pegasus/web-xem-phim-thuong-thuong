import { publicRoutes } from "../config/router"
import AboutPage from "../pages/about"
import FilmsPage from "../pages/films"
import DetailFilmPage from "../pages/films/detail"
import WatchFilm from "../pages/films/detail/watching"
import HomePage from "../pages/home"

const guestRouters = [
  {
    path: publicRoutes.home,
    component: HomePage
  },
  {
    path: publicRoutes.about,
    component: AboutPage
  },
  {
    path: publicRoutes.films,
    component: FilmsPage
  },
  {
    path: publicRoutes.detailFilm,
    component: DetailFilmPage
  },
  {
    path: publicRoutes.watchFilm,
    component: WatchFilm
  }
]


export { guestRouters }