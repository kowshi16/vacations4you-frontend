import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./core";

export const loginAPI = async (data) => {
    try {
        const response = await axios({
            method: "POST",
            baseURL: BASE_URL,
            url: "/api/user/login",
            headers: {},
            data: data,
        });

        console.log("loginAPI response", response);
        return response;
    } catch (error) {
        console.log("loginAPI response", error);
        throw error;
    }
};

export const signupAPI = async (data) => {
    try {
        const response = await axios({
            method: "POST",
            baseURL: BASE_URL,
            url: "/api/user/signup",
            headers: {},
            data: data,
        });

        console.log("signupAPI response", response);
        return response;
    } catch (error) {
        console.log("signupAPI response", error);
        throw error;
    }
};