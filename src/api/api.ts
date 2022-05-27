import axios from "axios";

import {
  iChangeBackgroundMonitor,
  iGetBackgroundMonitorInfo,
  iBackgroundInfo,
} from "./interfaces/interfacesAPI";

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
};

export const filterAPI = {
  async applyFilter(url: string, data: FormData) {
    await axios.post(url, data);
  },
  async clearFilter(url: string) {
    await axios.post(`${url}clearFilter`);
  },
};

// export const filterAPI = {
//   async getSourceTraffic(formData) {
//     const request = await axios.post("getChannels", formData);

//     return JSON.parse(request.request.response);
//   },
//   async getCommunities(formData) {
//     const request = await axios.post("getCommunities", formData);

//     return request.data;
//   },
// };

// export const analyticAPI = {
//   async changeColors(formData) {
//     await axios.post("/funnel/", formData);
//   },
// };

// export const dealAPI = {
//   async getFunnels() {
//     const request = await axios.get("/api/deals/getFunnels");

//     return JSON.parse(request.request.response);
//   },
// };
