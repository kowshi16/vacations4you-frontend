import { BASE_URL } from "./core";
import axios from "axios";

export const getAllCruiseAPI = async () => {
  try {
    const response = await axios({
      method: "GET",
      baseURL: BASE_URL,
      url: "/api/cruise/all",
      headers: {},
    });

    console.log("getAllCruiseAPI response", response);
    return response;
  } catch (error) {
    console.log("getAllCruiseAPI response", error);
    throw error;
  }
};

export const getCruiseByFiltersAPI = async (params) => {
  try {
    const response = await axios({
      method: "GET",
      baseURL: BASE_URL,
      url: "/api/cruise",
      headers: {},
      params: params,
    });

    console.log("getCruiseByFiltersAPI response", response);
    return response;
  } catch (error) {
    console.log("getCruiseByFiltersAPI response", error);
    throw error;
  }
};

export const saveCruiseBookingAPI = async (params) => {
  try {
    console.log(params)
    const response = await axios({
      method: "POST",
      baseURL: BASE_URL,
      url: "/api/cruise/booking/save",
      headers: {},
      data: params,
    });

    console.log("saveCruiseBookingAPI response", response);
    return response;
  } catch (error) {
    console.log("saveCruiseBookingAPI error", error);
    throw error;
  }
};
