import apiClient from "../../apiClient";
import { API_PATHS } from "../../apiConfig";

export const appointmentDoctor = async (data) => {
    const url = `${API_PATHS.appointment.appointmentDoctor}`
    const response = await apiClient.get(url, data);
    console.log(`[GET] ${url} [${response.status}]`)
    console.log(response.data)
    return response.data;
}
