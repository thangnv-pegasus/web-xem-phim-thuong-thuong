export interface IFilm {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
}

export interface IPaginate {
  current_page: number;
  total_page: number;
  total_items: number;
  item_per_page: number;
}

export interface IBaseReponse<T> {
  status: string;
  paginate: IPaginate;
  items: T
}

export interface IDefailFilmResponse<T>{
  status: string;
  movie: T
}

export interface IBaseLink {
  title: string
  slug: string
}

export interface ILinkLoop extends IBaseLink {
  child: IBaseLink
}

export interface IDetailFilm extends IFilm {
  id: string;
  category: ICategory;
  episodes: IEpisodeServer[];
}

// Interface cho danh mục (category)
interface ICategory {
  [key: string]: ICategoryGroup;
}

interface ICategoryGroup {
  group: {
    id: string;
    name: string;
  };
  list: ICategoryItem[];
}

interface ICategoryItem {
  id: string;
  name: string;
}

// Interface cho tập phim và server
interface IEpisodeServer {
  server_name: string;
  items: IEpisodeItem[];
}

interface IEpisodeItem {
  name: string;
  slug: string;
  embed: string;
  m3u8: string;
}