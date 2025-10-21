import { publicRoutes } from "../config/router"
import AboutPage from "../pages/about"
import LoginPage from "../pages/auth/login"
import RegisterPage from "../pages/auth/register"
import FilmsPage from "../pages/films"
import DetailFilmPage from "../pages/films/detail"
import WatchFilm from "../pages/films/detail/watching"
import SearchPage from "../pages/films/search"
import HomePage from "../pages/home"
import NotFound from "../pages/not-found"

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
  },
  {
    path: publicRoutes.search,
    component: SearchPage
  },
  {
    path: publicRoutes.notFound,
    component: NotFound
  },
  {
    path: publicRoutes.login,
    component: LoginPage
  },
  {
    path: publicRoutes.register,
    component: RegisterPage
  },
  {
    path: '*',
    component: NotFound
  }
]


export { guestRouters }