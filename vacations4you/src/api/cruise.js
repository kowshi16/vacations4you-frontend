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