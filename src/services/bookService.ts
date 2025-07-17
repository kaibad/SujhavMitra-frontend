import axios from "../utils/axiosInstance";
import type { Book } from "../types";

export const getRecommendedBooks = async (title: string): Promise<Book[]> => {
  const response = await axios.get("/recommend/book", {
    params: { title },
  });
  return response.data.recommendations || response.data.popular_books || [];
};
