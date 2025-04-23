import apiClient from "../../apiClient";
import { API_PATHS } from "../../apiConfig";

export const CustomerHistoryXray = async (data) => {
    const url = `${API_PATHS.customer.customerHistoryXray}`
    const response = await apiClient.post(url, data);
    console.log(`[GET] ${url} [${response.status}]`)
    console.log(response.data)
    return response.data;
}
