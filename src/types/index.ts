export interface Book {
  title: string;
  author: string;
  isbn: string;
  publishdate: string;
  publisher: string;
  imageurl: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  genres: string[] | string;
  cast: string[] | string;
  crew: string;
}
