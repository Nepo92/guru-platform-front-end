import axios from "axios";

import {
	iChangeBackgroundMonitor,
	iGetBackgroundMonitorInfo,
	iBackgroundInfo,
} from "./interfacesAPI/interfacesAPI";

export const loginAPI = {
	async login(data: FormData) {
		const request = await axios.post("perform_login", data);

		return request.request.responseURL;
	},
};

export const monitorAPI = {
	async getCompanyBg(data: iGetBackgroundMonitorInfo) {
		const request = await axios.post("../monitor/getCompanyBgColor", data);

		const response: iBackgroundInfo = JSON.parse(request.request.response);

		return response;
	},
	async changeBackground(data: iChangeBackgroundMonitor) {
		const request = await axios.post("../monitor/updateCompanyBgColor", data);

		return JSON.parse(request.request.response);
	},
	async getChannels(data: FormData) {
		const request = await axios.post("/funnel/traffic/getChannels", data);

		return JSON.parse(request.request.response);
	},
	async getCommunities(data: FormData) {
		const request = await axios.post("/funnel/traffic/getCommunities", data);

		return JSON.parse(request.request.response);
	},
};

export const filterAPI = {
	async applyFilter(url: string, data: FormData) {
		await axios.post(url, data);
	},
	async clearFilter(url: string) {
		await axios.post(`${url}clearFilter`);
	},
};

export const dealAPI = {
	async getFunnels() {
		const request = await axios.get("/api/deals/getFunnels");

		return JSON.parse(request.request.response);
	},
};
