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
};

export const analyticAPI = {
  async changeColors(formData) {
    await axios.post("/funnel/", formData);
  },
  async changeAnalyticDate(formData) {
    await axios.post("/funnel/", formData);
  },
};

export const dealAPI = {
  async getFunnels() {
    const request = await axios.get("/api/deals/getFunnels");

    return JSON.parse(request.request.response);
  },
};
