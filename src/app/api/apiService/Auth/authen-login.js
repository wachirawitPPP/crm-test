import apiClient from "../../apiClient";
import { API_PATHS } from "../../apiConfig";

export const authLogin = async (data) => {
    const url = API_PATHS.auth.login; 
    try {
      const response = await apiClient.post(url, data);
      console.log(`[POST] ${url} [${response.status}]`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred";
      console.error(`[POST] ${url} [ERROR]:`, errorMessage);
      throw error; 
    }
  };