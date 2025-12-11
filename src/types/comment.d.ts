export interface IComment {
  data: any;
  id: number;
  episodeId: number;
  userId: number;
  user: {
    id: number;
    name: string;
  }
  content: string;
  createdAt: string;
  updatedAt: string;
}