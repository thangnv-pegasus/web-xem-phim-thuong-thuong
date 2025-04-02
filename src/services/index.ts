import { http } from "../config/axios";
import { NAV_LINK } from "../constants/page";
import { IBaseReponse, IFilm } from "../types";

const API_PATH = {
  GET_NEW_FILMS: (page: number) => `/films/phim-moi-cap-nhat?page=${page}`,
  GET_FILMS_BY_CATEGORY: ({
    slug = "",
    page = 1,
  }: {
    slug: string;
    page: number;
  }) => `/films/danh-sach/${slug}?page=${page}`,
  GET_DETAIL_FILM: (slug: string) => `/film/${slug}`,
  GET_FILMS_BY_GENRE: (slug: string, page: number) =>
    `/films/the-loai/${slug}?page=${page}`,
  GET_FILMS_BY_COUNTRY: ({
    slug = "",
    page = 1,
  }: {
    slug: string;
    page: number;
  }) => `/films/quoc-gia/${slug}?page=${page}`,
  GET_FILMS_BY_YEAR: (slug: string, page = 1) =>
    `/films/nam-phat-hanh/${slug}?page=${page}`,
  GET_FILMS_BY_KEYWORDS: (slug = "") => `/films/search?keyword=${slug}`,
};

export const getNewFilms = async (page = 1): Promise<IBaseReponse<IFilm[]>> => {
  const { data } = await http(API_PATH.GET_NEW_FILMS(page));

  return data;
};

export const getFilmByGenre = async (
  genre = "",
  page = 1
): Promise<IBaseReponse<IFilm[]>> => {
  const { data } = await http(API_PATH.GET_FILMS_BY_GENRE(genre, page));

  return data;
};

export const getFilmsByYear = async (year: string, page = 1): Promise<IBaseReponse<IFilm[]>> => {
  const { data } = await http(API_PATH.GET_FILMS_BY_YEAR(year, page));

  return data;
};
