import { BASE_URL } from "./core";
import axios from "axios";

export const getAllActivityAPI = async () => {
    try {
        const response = await axios({
            method: "GET",
            baseURL: BASE_URL,
            url: "/api/activity/getAllActivity",
            headers: {},
        });

        console.log("getAllActivityAPI response", response);
        return response;
    } catch (error) {
        console.log("getAllActivityAPI response", error);
        throw error;
    }
};

export const getActivityBySearchCriteriaAPI = async (data) => {
    try {
        const response = await axios({
            method: "POST",
            baseURL: BASE_URL,
            url: "/api/activity/getActivityBySearchCriteria",
            headers: {},
            data: data,
        });

        console.log("getActivityBySearchCriteriaAPI response", response);
        return response;
    } catch (error) {
        console.log("getActivityBySearchCriteriaAPI response", error);
        throw error;
    }
};

export const getDestinationsAPI = async () => {
    try {
        const response = await axios({
            method: "GET",
            baseURL: BASE_URL,
            url: "/api/activity/getDestinations",
            headers: {},
        });

        console.log("getDestinationsAPI response", response);
        return response;
    } catch (error) {
        console.log("getDestinationsAPI response", error);
        throw error;
    }
};

export const getActivityTypeAPI = async () => {
    try {
        const response = await axios({
            method: "GET",
            baseURL: BASE_URL,
            url: "/api/activity/getActivityType",
            headers: {},
        });

        console.log("getActivityTypeAPI response", response);
        return response;
    } catch (error) {
        console.log("getActivityTypeAPI response", error);
        throw error;
    }
};

export const saveActivityBookingAPI = async (params) => {
    try {
      const response = await axios({
        method: "POST",
        baseURL: BASE_URL,
        url: "/api/activity/booking/createActivityBooking",
        headers: {},
        data: params,
      });
  
      console.log("saveActivityBookingAPI response", response);
      return response;
    } catch (error) {
      console.log("saveActivityBookingAPI error", error);
      throw error;
    }
  };