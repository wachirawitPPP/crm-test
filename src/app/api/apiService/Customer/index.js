import apiClient from "../../apiClient";
import { API_PATHS } from "../../apiConfig";

const Customer = async (data) => {
    try {
        const response = await apiClient.get(`${API_PATHS.customer.customer}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
const CustomerOpdPagination = async (data) => {
    try {
        const response = await apiClient.get(`${API_PATHS.customer.customerOpdPagination}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
const CustomerReceiptPagination = async (data) => {
    try {
        const response = await apiClient.get(`${API_PATHS.customer.customerReceiptPagination}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
const CustomerHistoryLab = async (data) => {
    try {
        const response = await apiClient.get(`${API_PATHS.customer.customerHistoryLab}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
const CustomerHistoryXray = async (data) => {
    try {
        const response = await apiClient.get(`${API_PATHS.customer.customerHistoryXray}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
const CustomerHistoryDocument = async (data) => {
    try {
        const response = await apiClient.get(`${API_PATHS.customer.customerHistoryDocument}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default{
    Customer,
    CustomerOpdPagination,
    CustomerReceiptPagination,
    CustomerHistoryLab,
    CustomerHistoryXray,
    CustomerHistoryDocument,
}