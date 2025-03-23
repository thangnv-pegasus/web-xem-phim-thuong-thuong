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
