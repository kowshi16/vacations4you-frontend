import { BASE_URL } from "./core";
import axios from "axios";

export const getAllAgentDetailsAPI = async () => {
    try {
        const response = await axios({
            method: "GET",
            baseURL: BASE_URL,
            url: "/api/user/all",
            headers: {},
        });

        console.log("getAllAgentDetailsAPI response", response);
        return response;
    } catch (error) {
        console.log("getAllAgentDetailsAPI response", error);
        throw error;
    }
};

export const getTotalCruisePriceAPI = async () => {
    try {
        const response = await axios({
            method: "GET",
            baseURL: BASE_URL,
            url: "/api/cruise/total-cruise-price",
            headers: {},
        });

        console.log("getTotalCruisePriceAPI response", response);
        return response;
    } catch (error) {
        console.log("getTotalCruisePriceAPI response", error);
        throw error;
    }
};

export const getTotalActivityPriceAPI = async () => {
    try {
        const response = await axios({
            method: "GET",
            baseURL: BASE_URL,
            url: "/api/activity/total-activity-price",
            headers: {},
        });

        console.log("getTotalActivityPriceAPI response", response);
        return response;
    } catch (error) {
        console.log("getTotalActivityPriceAPI response", error);
        throw error;
    }
};

export const getTotalPackagePriceAPI = async () => {
    try {
        const response = await axios({
            method: "GET",
            baseURL: BASE_URL,
            url: "/api/package/total-package-price",
            headers: {},
        });

        console.log("getTotalPackagePriceAPI response", response);
        return response;
    } catch (error) {
        console.log("getTotalPackagePriceAPI response", error);
        throw error;
    }
};

export const addNewAgentAPI = async (data) => {
    try {
        const response = await axios({
            method: "POST",
            baseURL: BASE_URL,
            url: "/api/user/save",
            headers: {},
            data: data
        });

        console.log("addNewAgentAPI response", response);
        return response;
    } catch (error) {
        console.log("addNewAgentAPI response", error);
        throw error;
    }
};

export const getUserByIdAPI = async (id) => {
    try {
        const response = await axios({
            method: "GET",
            baseURL: BASE_URL,
            url: `api/user/${id}`,
            headers: {},
        });

        console.log("getUserByIdAPI response", response);
        return response;
    } catch (error) {
        console.log("getUserByIdAPI response", error);
        throw error;
    }
};

export const updatetUserByIdAPI = async (id, data) => {
    try {
        const response = await axios({
            method: "PUT",
            baseURL: BASE_URL,
            url: `api/user/update/${id}`,
            headers: {},
            data: data
        });

        console.log("updatetUserByIdAPI response", response);
        return response;
    } catch (error) {
        console.log("updatetUserByIdAPI response", error);
        throw error;
    }
};

export const resetPasswordAPI = async (id, data) => {
    try {
        const response = await axios({
            method: "PUT",
            baseURL: BASE_URL,
            url: `api/user/resetPassword/${id}`,
            headers: {},
            data: data
        });

        console.log("resetPasswordAPI response", response);
        return response;
    } catch (error) {
        console.log("resetPasswordAPI response", error);
        throw error;
    }
};