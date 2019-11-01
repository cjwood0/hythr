export interface Post {
  id: string;
  content: string;
  creator: { _id: string, name: string};
  createdAt: Date;
}
