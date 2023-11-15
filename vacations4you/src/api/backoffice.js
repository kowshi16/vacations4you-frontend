import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./core";

// Cruise
export const addCruiseData = async (values) => {
	const bodyFormData = new FormData();
	bodyFormData.append("csvFile", values.file);

	console.log(
		Object.fromEntries(bodyFormData),
		"**************File Server request API***************"
	);
	return await axios({
		method: "POST",
		baseURL: BASE_URL,
		url: "/api/package/upload/cruise",
		data: bodyFormData,
	})
		.then((response) => {
			console.log("addCruiseData response", response);
			return response.data;
		})
		.catch((error) => {
			console.log("addCruiseData response", error);
		});
};

// Cruise
export const saveFileAdapter = async (files) => {
	console.log(files);
	const data = { file: files[0], tagname: "test" };
	try {
		const res = await addCruiseData(data);

		console.log("Adapter Response ============>", res);

		return res;
	} catch (err) {
		console.log("Adapter error :", err);
		throw err;
	}
};

// Activity
export const addActivityData = async (values) => {
	const bodyFormData = new FormData();
	bodyFormData.append("csvFile", values.file);

	console.log(
		Object.fromEntries(bodyFormData),
		"**************File Server request API***************"
	);
	return await axios({
		method: "POST",
		baseURL: BASE_URL,
		url: "/api/package/upload/activity",
		data: bodyFormData,
	})
		.then((response) => {
			console.log("addActivityData response", response);
			return response.data;
		})
		.catch((error) => {
			console.log("addActivityData response", error);
		});
};

// Activity
export const saveFileAdapterActivity = async (files) => {
	console.log(files);
	const data = { file: files[0], tagname: "test" };
	try {
		const res = await addActivityData(data);

		console.log("Adapter Response ============>", res);

		return res;
	} catch (err) {
		console.log("Adapter error :", err);
		throw err;
	}
};

// Package
export const addPackageData = async (values) => {
	const bodyFormData = new FormData();
	bodyFormData.append("csvFile", values.file);

	console.log(
		Object.fromEntries(bodyFormData),
		"**************File Server request API***************"
	);
	return await axios({
		method: "POST",
		baseURL: BASE_URL,
		url: "/api/package/upload/package",
		data: bodyFormData,
	})
		.then((response) => {
			console.log("addPackageData response", response);
			return response.data;
		})
		.catch((error) => {
			console.log("addPackageData response", error);
		});
};

// Package
export const saveFileAdapterPackage = async (files) => {
	console.log(files);
	const data = { file: files[0], tagname: "test" };
	try {
		const res = await addPackageData(data);

		console.log("Adapter Response ============>", res);

		return res;
	} catch (err) {
		console.log("Adapter error :", err);
		throw err;
	}
};