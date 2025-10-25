export interface IFilmHistory {
  id: number;
  created_at: string;
  updated_at: string;
  episode: {
    name: string;
    film: {
      id: number;
      name: string;
      slug: string;
      poster_url: string;
      thumb_url: string;
      original_name: string;
      time: string;
      total_episodes: number;
      quality: string;
    }
  }
}