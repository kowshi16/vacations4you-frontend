import { BASE_URL } from "./core";
import axios from "axios";

export const getAllPackageAPI = async () => {
    try {
        const response = await axios({
            method: "GET",
            baseURL: BASE_URL,
            url: "/api/package/getAllPackage",
            headers: {},
        });

        console.log("getAllPackageAPI response", response);
        return response;
    } catch (error) {
        console.log("getAllPackageAPI response", error);
        throw error;
    }
};

export const getPackageBySearchCriteriaAPI = async (data) => {
    try {
        const response = await axios({
            method: "POST",
            baseURL: BASE_URL,
            url: "/api/package/getPackageBySearchCriteria",
            headers: {},
            data: data,
        });

        console.log("getPackageBySearchCriteriaAPI response", response);
        return response;
    } catch (error) {
        console.log("getPackageBySearchCriteriaAPI response", error);
        throw error;
    }
};

export const getDestinationsAPI = async () => {
    try {
        const response = await axios({
            method: "GET",
            baseURL: BASE_URL,
            url: "/api/package/getDestinations",
            headers: {},
        });

        console.log("getDestinationsAPI response", response);
        return response;
    } catch (error) {
        console.log("getDestinationsAPI response", error);
        throw error;
    }
};

export const getCategoryAPI = async () => {
    try {
        const response = await axios({
            method: "GET",
            baseURL: BASE_URL,
            url: "/api/package/getCategory",
            headers: {},
        });

        console.log("getCategoryAPI response", response);
        return response;
    } catch (error) {
        console.log("getCategoryAPI response", error);
        throw error;
    }
};

export const savePackageBookingAPI = async (params) => {
    try {
      const response = await axios({
        method: "POST",
        baseURL: BASE_URL,
        url: "/api/package/booking/createPackageBooking",
        headers: {},
        data: params,
      });
  
      console.log("savePackageBookingAPI response", response);
      return response;
    } catch (error) {
      console.log("savePackageBookingAPI error", error);
      throw error;
    }
  };