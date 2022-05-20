import axios from "axios";

export const monitorAPI = {
  async getCompanyBg(data) {
    const request = await axios.post("../monitor/getCompanyBgColor", data);

    return JSON.parse(request.request.response);
  },
  async changeBackground(data) {
    const request = await axios.post("../monitor/updateCompanyBgColor", data);

    return JSON.parse(request.request.response);
  },
};

export const filterAPI = {
  async applyFilter(url, formData) {
    await axios.post(url, formData);
  },
  async clearFilter(url) {
    await axios.post(`${url}clearFilter`);
  },
  async getSourceTraffic(formData) {
    const request = await axios.post("getChannels", formData);

    return JSON.parse(request.request.response);
  },
  async getCommunities(formData) {
    const request = await axios.post("getCommunities", formData);

    return request.data;
  },
};

export const analyticAPI = {
  async changeColors(formData) {
    await axios.post("/funnel/", formData);
  },
};

export const dealAPI = {
  async getFunnels() {
    const request = await axios.get("/api/deals/getFunnels");

    return JSON.parse(request.request.response);
  },
};
