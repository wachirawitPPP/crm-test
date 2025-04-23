import apiClient from "../../apiClient";
import { API_PATHS } from "../../apiConfig";

export const CustomerHistoryLab = async (data) => {
    const url = `${API_PATHS.customer.customerHistoryLab}`;
    const response = await apiClient.post(url, data);
    console.log(`[POST] ${url} [${response.status}]`);
    console.log(response.data);
    return response.data;
};