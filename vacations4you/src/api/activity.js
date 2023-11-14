import { BASE_URL } from "./core";
import axios, { AxiosResponse } from "axios";

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