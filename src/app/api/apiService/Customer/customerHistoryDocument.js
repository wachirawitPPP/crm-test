import apiClient from "../../apiClient";
import { API_PATHS } from "../../apiConfig";

export const customerHistoryDocument = async (data) => {
    const url = `${API_PATHS.customer.customerHistoryDocument}`
    const response = await apiClient.post(url, data);
    console.log(`[GET] ${url} [${response.status}]`)
    console.log(response.data)
    return response.data;
}
