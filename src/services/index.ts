import { http } from "../config/axios";
import {
  IBaseReponse,
  IDefailFilmResponse,
  IDetailFilm,
  IFilm,
} from "../types";

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
  GET_FILMS_BY_COUNTRY: (slug = "", page = 1) =>
    `/films/quoc-gia/${slug}?page=${page}`,
  GET_FILMS_BY_YEAR: (slug: string, page = 1) =>
    `/films/nam-phat-hanh/${slug}?page=${page}`,
  GET_FILMS_BY_KEYWORDS: (slug = "", page = 1) =>
    `/films/search?keyword=${slug}&page=${page}`,
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

export const getFilmsByYear = async (
  year: string,
  page = 1
): Promise<IBaseReponse<IFilm[]>> => {
  const { data } = await http(API_PATH.GET_FILMS_BY_YEAR(year, page));

  return data;
};

export const getFilmsByCountry = async (
  country = "",
  page = 1
): Promise<IBaseReponse<IFilm[]>> => {
  const { data } = await http(API_PATH.GET_FILMS_BY_COUNTRY(country, page));

  return data;
};

export const getDetailFilm = async (
  slug: string
): Promise<IDefailFilmResponse<IDetailFilm>> => {
  const { data } = await http(API_PATH.GET_DETAIL_FILM(slug));

  return data;
};

export const getFilmsByKeyword = async (
  keyword: string,
  page = 1
): Promise<IBaseReponse<IFilm[]>> => {
  const { data } = await http(API_PATH.GET_FILMS_BY_KEYWORDS(keyword, page));

  return data;
};
