import apiClient from "../apiClient";
import { API_PATHS } from "../apiConfig";

export const appointmentTopic = async (data) => {
  try {
    const response = await apiClient.get(API_PATHS.appointment.appointmentTopic, { params: data });
    return response.data;
  } catch (error) {
    console.error("Error in appointmentTopic:", error);
    throw error;
  }
};

export const appointmentTime = async (data) => {
  try {
    const response = await apiClient.get(API_PATHS.appointment.appointmentTime, { params: data });
    return response.data;
  } catch (error) {
    console.error("Error in appointmentTime:", error);
    throw error;
  }
};

export const appointmentDoctor = async (data) => {
  try {
    const response = await apiClient.get(API_PATHS.appointment.appointmentDoctor, { params: data });
    return response.data;
  } catch (error) {
    console.error("Error in appointmentDoctor:", error);
    throw error;
  }
};

export const appointmentList = async (data) => {
  try {
    const response = await apiClient.get(API_PATHS.appointment.appointmentList, { params: data });
    return response.data;
  } catch (error) {
    console.error("Error in appointmentList:", error);
    throw error;
  }
};

export const appointmentAdd = async (data) => {
  try {
    const response = await apiClient.post(API_PATHS.appointment.appointmentAdd, data);
    return response.data;
  } catch (error) {
    console.error("Error in appointmentAdd:", error);
    throw error;
  }
};

export const appointmentApId = async (data) => {
  try {
    const response = await apiClient.delete(API_PATHS.appointment.appointmentApId, { data });
    return response.data;
  } catch (error) {
    console.error("Error in appointmentApId:", error);
    throw error;
  }
};

export default {
  appointmentTopic,
  appointmentTime,
  appointmentDoctor,
  appointmentList,
  appointmentAdd,
  appointmentApId,
};
