import axios from "axios";

const API_KEY = "6dfb92a459e486e939df92f9e545e65f"
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, language: "es-ES" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error obteniendo películas:", error);
    return [];
  }
};
