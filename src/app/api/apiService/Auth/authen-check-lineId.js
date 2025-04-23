import apiClient from "../../apiClient";
import { API_PATHS } from "../../apiConfig";

export const authCheckLineId = async (data) => {
    const url = `${API_PATHS.auth.checkLineId}`
    const response = await apiClient.post(url, data);
    console.log(`[POST] ${url} [${response.status}]`)
    return response.data;
}