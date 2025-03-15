import { publicRoutes } from "../config/router"
import AboutPage from "../pages/about"
import FilmsPage from "../pages/films"
import DetailFilmPage from "../pages/films/detail"
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
  }
]


export { guestRouters }