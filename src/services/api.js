// src/services/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: "application/json",
  },
  // optional timeout
  timeout: 10000,
});

function handleAxiosError(err) {
  if (axios.isAxiosError(err)) {
    // try to extract a useful message from response or error
    if (err.response) {
      const status = err.response.status;
      const data = err.response.data;
      // if backend returns { error: "..."} use that
      if (data && typeof data === "object" && data.error) {
        throw new Error(`HTTP ${status} - ${data.error}`);
      }
      // try to stringify the response data
      throw new Error(`HTTP ${status} - ${JSON.stringify(data)}`);
    }
    if (err.request) {
      throw new Error("No response received from server.");
    }
    throw new Error(err.message || "Axios error");
  }
  throw err;
}

// generic request helper (returns data)
async function request(path) {
  try {
    const res = await client.get(path);
    return res.data;
  } catch (err) {
    handleAxiosError(err);
  }
}

// Fetch popular books (no title param)
export async function fetchPopularBooks() {
  return await request(`/recommend/book`);
}

// Fetch book recommendations (pass title)
export async function fetchBookRecommendations(title = "") {
  const q = title ? `?title=${encodeURIComponent(title)}` : "";
  return await request(`/recommend/book${q}`);
}

export default { fetchPopularBooks, fetchBookRecommendations };
