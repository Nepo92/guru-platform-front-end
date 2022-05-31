export const tariffAPI = {
  async getTariffs(data) {
    const request = await $.ajax({
      type: "POST",
      url: "/products/courses/getTariffs",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveTariff(tariff) {
    const request = await $.ajax({
      type: "POST",
      url: "/products/courses/saveTariff",
      data: JSON.stringify(tariff),
      processData: false,
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getTariff(id) {
    const request = await $.ajax({
      type: "GET",
      url: `/products/courses/getTariff/${id}`,
      data: null,
      processData: false,
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateTariff(data) {
    const request = await $.ajax({
      type: "POST",
      url: "/products/courses/updateTariff",
      data: JSON.stringify(data),
      processData: false,
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async deleteTariff(idTariff) {
    const request = await $.ajax({
      type: "GET",
      url: `/products/courses/deleteTariff/${idTariff}`,
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const blockAPI = {
  async getBlocks(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "/products/courses/getBlocks",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const taskAPI = {
  async saveTask(newTask) {
    const request = await $.ajax({
      type: "POST",
      url: "/api/deals/saveReminder",
      data: JSON.stringify(newTask),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async deleteTask(idTask) {
    const request = await $.ajax({
      type: "POST",
      url: "/api/deals/deleteReminder",
      data: JSON.stringify(idTask),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async getTasks(idDeal) {
    const request = await $.ajax({
      type: "POST",
      url: "/api/deals/getReminders",
      data: JSON.stringify(idDeal),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async completeTask(data) {
    const request = await $.ajax({
      type: "POST",
      url: "/api/deals/changeReminder",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const homeworkAPI = {
  async getHomework(data) {
    const request = await $.ajax({
      type: "POST",
      url: "getHomework",
      data: JSON.stringify(data),
      processData: false,
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async sendComment(data) {
    const request = await $.ajax({
      type: "POST",
      url: "saveRateHomework",
      data,
      processData: false,
      contentType: false,
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveHomework(data) {
    let mainHref = "saveHomework";
    const checkArray = document.location.href.split("?");

    if (checkArray.length > 1) {
      mainHref = `${document.location.href.split("?")[0]}/saveHomework`;
    }

    const request = await $.ajax({
      type: "POST",
      url: mainHref,
      data,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
      beforeSend() {},
    });

    return request;
  },
  async getDeal(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/homework/getDeal",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async changeAccessToDeal(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/homework/changeModulesAllowed",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async changeAccessToModules(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/homework/changeModulesEnabled",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async changeBlockEnabled(data) {
    const request = await $.ajax({
      type: "POST",
      url: "/homework/changeClientCourseBlockEnabled",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });
    return request;
  },
  async getModules(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/homework/getDealsModulesInfo",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async getBlocks(data) {
    const request = $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/homework/getClientCourseBlocks",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async updateAllowed(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/homework/updateAllowed",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const clientAPI = {
  async updatePassword(data) {
    const request = await $.ajax({
      type: "POST",
      url: "/api/clients/updatePassword",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
      beforeSend() {},
    });

    return request;
  },
  async generatePassword() {
    const request = await $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/api/clients/generatePassword",
      data: null,
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async getClientInfo(data) {
    const request = await $.ajax({
      type: "POST",
      url: "/api/clients/getClientInfo",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
      beforeSend() {},
    });

    return request;
  },
  async getAccess(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/clients/createUser",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveChanges(data) {
    const request = $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/clients/updateClient",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });
    return request;
  },
  async searchClient(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/clients/searchClients",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveClient(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/clients/saveClientInfo",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async hideClient(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/clients/changeHidden",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const dealAPI = {
  async getDeals(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/getDeals",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getModules(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/getDealsModulesInfo",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async getBlocks(data) {
    const request = $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/getClientCourseBlocks",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async getStatuses() {
    const request = await $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/api/deals/getDealStatuses",
      data: null,
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async changeDealStatus(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/updateDealStatus",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async changeAccessToDeal(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/changeModulesAllowed",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async changeAccessToModules(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/changeModulesEnabled",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async getPaymentMethods() {
    const request = await $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/api/deals/getPaymentMethods",
      data: null,
      dataType: "json",
      cache: false,
      success() {},
    });

    return request;
  },
  async changeBlockEnabled(data) {
    const request = await $.ajax({
      type: "POST",
      url: "/api/deals/changeClientCourseBlockEnabled",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });
    return request;
  },
  async getDeal(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/getDeal",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getFunnels() {
    const request = await $.ajax({
      type: "GET",
      url: "/api/deals/getFunnels/",
      data: null,
      processData: false,
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getCourses() {
    const request = await $.ajax({
      type: "GET",
      url: "/api/deals/getCourses/",
      data: null,
      processData: false,
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getStreams(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "/deals/getStreamsByIdCourse",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateDeal(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/updateDeal",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getTariff(data) {
    const request = await $.ajax({
      type: "POST",
      url: "/api/deals/getTariffs",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async hideDeal(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/hideDeal",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getSocials(data) {
    const request = await $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/api/deals/getSocials",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  // Менеджер
  async getManagerStreams(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "/transactions/getStreamsByIdCourse",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async createDeal(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/saveDeal",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async revealDeal(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/revealDeal",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async viewDeal(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/getViewDeal",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getRateInfo(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "getRateInfo",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getTheme(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "../products/courses/getCourse",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateAllowed(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/deals/updateAllowed",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const billAPI = {
  async checkBillSatus(idClient, idBill) {
    const request = await $.ajax({
      type: "GET",
      url: `/api/bills/getYKBillStatus/${idClient}/${idBill}`,
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getLinkBill(idBill) {
    const request = await $.ajax({
      type: "GET",
      url: `/api/bills/getBillLink/${idBill}`,
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getBills(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/bills/getBills",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async uploadCheck(data) {
    const request = await $.ajax({
      type: "POST",
      url: "/api/bills/uploadBill",
      data,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateBill(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/bills/updateBill",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async removeBill(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/bills/deleteBill",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveBill(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/api/bills/saveBill",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async generateBills(idDeal, idCBPattern) {
    const request = await $.ajax({
      type: "GET",
      url: `/api/bills/generateBills/${idDeal}/${idCBPattern}`,
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getBillTemplates() {
    const request = await $.ajax({
      type: "GET",
      url: "/api/bills/getCommonPatterns",
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const checkAPI = {
  async saveSMS(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/sms-checks/saveCheck",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getUnusedSms() {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/sms-checks/getUnusedSmsChecks",
      data: null,
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateSMS(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/sms-checks/update",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async deleteSMS(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/sms-checks/delete",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async selectSMS(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/sms-checks/tieSmsCheck",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async unSelectSMS(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/sms-checks/untieSmsCheck",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async removeImage(data) {
    const request = await $.ajax({
      type: "POST",
      url: "/api/bills/deleteBillImage",
      data,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveCheck(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "/api/bills/saveFullBill",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const fileAPI = {
  async downloadTable() {
    const request = await $.ajax({
      type: "GET",
      url: "/deals/download/deals.xlsx",
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async downloadDeals() {
    const request = await $.ajax({
      type: "GET",
      url: "/clients-list/download/clientDeals.xlsx",
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async downloadPayments() {
    const request = await $.ajax({
      type: "GET",
      url: "/payment/download/payments.xlsx",
      data: null,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const monitorAPI = {
  async changeBackground(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: " ../monitor/updateCompanyBgColor",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getCompanyBg(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: " ../monitor/getCompanyBgColor",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const funnelAPI = {
  async funnelAdd(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "saveFunnel",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getFunnelsLinks(idFunnel) {
    const request = await $.ajax({
      type: "GET",
      contentType: "application/json",
      url: `getLinks/${idFunnel}`,
      data: null,
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async funnelRemove(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "deleteFunnel",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getAudience(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "getCommunities",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getChannel(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "getChannels",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const examinerAPI = {
  async getReateItems(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "getRateTemplatesInfo",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const advertiserAPI = {
  async distributePayment(data) {
    const request = await $.ajax({
      url: "/payment/distributeFew/",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      async: false,
      cache: false,
      processData: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const motivationAPI = {
  async getMotivation() {
    const request = await $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "getWageRates",
      data: null,
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getEmptyWage(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "getEmptyWageRate",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveWageRate(updatingBox) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "saveWageRate",
      data: JSON.stringify(updatingBox),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async removeMotivation(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "deleteWageRate",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const tunnelAPI = {
  async saveOutsideLink(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "saveOutsideLink",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const bannerAPI = {
  async removeBanner(idBanner) {
    const request = await $.ajax({
      type: "GET",
      url: `deleteBanner/${idBanner}`,
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveBanner(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "saveBanner",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveBannerToCourse(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/banners-settings/saveCourseToBanner",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getBanners(idCompany) {
    const request = await $.ajax({
      type: "GET",
      url: `getBannersByCompany/${idCompany}`,
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getBannersCourse(idCourse) {
    const request = await $.ajax({
      type: "GET",
      url: `/banners-settings/getBannersByCourse/${idCourse}`,
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const sectionAPI = {
  async saveSection(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "/saveArticle",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });
    return request;
  },
  async getSectionData(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "getTheme",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });
    return request;
  },
  async updateSection(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "saveArticle",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });
    return request;
  },
  async createArticle(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "saveArticle",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });
    return request;
  },
  async getArticle(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "getArticle",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async deleteArticle(data) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "deleteArticle",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });
  },
  async updateArticle(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "updateArticle",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const aboutCompanyAPI = {
  async saveSection(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/a-corporate-center/about-company/saveTheme",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getSection(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "getTheme",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async removeSection(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/a-corporate-center/about-company/deleteTheme",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateSection(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "updateTheme",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async addArticle(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "saveArticle",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getArticle(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/a-corporate-center/about-company/getArticle",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateArticle(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "/updateArticle",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async deleteArticle(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "deleteArticle",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const paymentFormAPI = {
  async getLink(idForm) {
    const request = await $.ajax({
      type: "GET",
      url: `/payment-form-builder/getPaymentFormLink/${idForm}`,
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getPaymentForms() {
    const request = await $.ajax({
      type: "GET",
      url: "/payment-form-builder/getPaymentForms",
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async savePaymentForms(data) {
    const request = await $.ajax({
      url: "/payment-form-builder/savePaymentForm",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      async: false,
      cache: false,
      processData: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getOutsideLinks() {
    const request = await $.ajax({
      url: "/payment-form-builder/getOutsideLinks",
      type: "GET",
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async removePaymentForm(idForm) {
    const request = await $.ajax({
      url: `/payment-form-builder/deletePaymentForm/${idForm}`,
      type: "GET",
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });
    return request;
  },
  async getPaymentForm(idForm) {
    const request = await $.ajax({
      url: `/payment-form-builder/getPaymentForm/${idForm}`,
      type: "GET",
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updatePaymentForm(data) {
    const request = await $.ajax({
      url: "/payment-form-builder/updatePaymentForm",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      async: false,
      cache: false,
      processData: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getPayFromUser(data, id) {
    const request = await $.ajax({
      url: `/toPayByUser/${id}`,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      async: false,
      cache: false,
      processData: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getPayFromClient(data, id) {
    const request = await $.ajax({
      url: `/toPay/${id}`,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      async: false,
      cache: false,
      processData: false,
      success() {},
      error() {},
    });

    return request;
  },
  async registrationNewClient(data) {
    const request = await $.ajax({
      url: "/public-registration/new-client",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      async: false,
      cache: false,
      processData: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const billTemplateAPI = {
  async getBillTemplates() {
    const request = await $.ajax({
      type: "GET",
      url: "/bill-pattern/getCommonPatterns",
      data: null,
      processData: false,
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async checkPatterns(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "checkPatterns",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveBillTemplate(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/bill-pattern/saveCommonPatterns",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getBillTemplate(id) {
    const request = await $.ajax({
      type: "GET",
      url: `getCommonPattern/${id}`,
      data: null,
      processData: false,
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async removeBillTemplate(id) {
    const request = await $.ajax({
      type: "GET",
      url: `deleteCommonPattern/${id}`,
      data: null,
      processData: false,
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateBillTemplate(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "updateCommonPatterns",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const knowledgeBaseAPI = {
  async saveSection(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/a-corporate-center/bookmarks/saveTheme",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveSectionManagement(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/a-corporate-center/bookmarks/management/saveTheme",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveSectionAdvertiser(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/a-corporate-center/bookmarks/advertiser/saveTheme",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveSectionManager(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/a-corporate-center/bookmarks/advertiser/saveTheme",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getSection(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "getTheme",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async removeSection(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/a-corporate-center/bookmarks/deleteTheme",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateSection(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "updateTheme",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async addArticle(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "saveArticle",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getArticle(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/a-corporate-center/bookmarks/getArticle",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateArticle(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "/updateArticle",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async deleteArticle(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "deleteArticle",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const reglamentAPI = {
  async saveReglament(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "saveArticle",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getReglament(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "getArticle",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateReglament(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "updateArticle",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async deleteReglament(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "deleteArticle",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const trainigCenterAPI = {
  async saveCourse(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "saveTutorial",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async deleteReglament(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "getTutorial",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateCourse(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "updateTutorial",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async removeCourse(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "deleteTutorial",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getCourseData(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "getTutorial",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveLesson(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "saveLesson",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getLesson(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "getLesson",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async remvoveLesson(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "deleteLesson",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateLesson(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "updateLesson",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async removeDocument(formData) {
    const request = await $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "deleteDocument",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const clientCleanerAPI = {
  async getCopies(data) {
    const request = await $.ajax({
      type: "GET",
      url: `getCopies/${data}`,
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async removeClient(data) {
    const request = await $.ajax({
      type: "GET",
      url: `../client-cleaner/deleteClient/${data}`,
      data: null,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async joinCopies(idClientTo, idClientFrom, data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: `moveDeals/${idClientTo}/${idClientFrom}`,
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const courseAPI = {
  async updateCourse(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "updateCourse",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveCourse(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "saveCourse",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getCourse(formData) {
    const request = await $.ajax({
      type: "POST",
      url: "getCourse",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async deleteCourse(formData) {
    const request = $.ajax({
      type: "POST",
      url: "deleteCourse",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const contractAPI = {
  async getContracts() {
    const request = await $.ajax({
      type: "GET",
      url: "./getDocumentLinks",
      data: null,
      processData: false,
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async saveContract(data) {
    const request = await $.ajax({
      type: "POST",
      url: "./saveDocumentLink",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async removeContract(data) {
    const request = await $.ajax({
      type: "POST",
      url: "./deleteDocumentLink",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async updateContract(data) {
    const request = await $.ajax({
      type: "POST",
      url: "./updateDocumentLink",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getTypes() {
    const request = await $.ajax({
      type: "GET",
      url: "./getDocumentLinksTypes",
      data: null,
      processData: false,
      contentType: "application/json",
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const planAPI = {
  async save(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "saveCommonPlan",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async deleteFunnel(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "deleteFunnelPlan",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async deleteManagerPlan(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "deleteManagerPlan",
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async refresh(year, month) {
    const request = await $.ajax({
      type: "GET",
      contentType: "application/json",
      url: `getCommonPlan/${year}/${month}`,
      data: null,
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};

export const paymentMethodAPI = {
  async getLink(idShop) {
    const request = await $.ajax({
      type: "GET",
      contentType: "application/json",
      url: `./getPaymentMethodWebhook/${idShop}`,
      data: null,
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });
    return request;
  },
};

export const tildaAPI = {
  root: "/api/tildaSettings/",
  async saveFunnel(data) {
    const request = await $.ajax({
      type: "POST",
      contentType: "application/json",
      url: `${this.root}saveFormFunnel`,
      data: JSON.stringify(data),
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
  async getTildaForm(idFunnel) {
    const request = await $.ajax({
      type: "GET",
      contentType: "application/json",
      url: `${this.root}getIdTildaForm/${idFunnel}`,
      data: null,
      dataType: "json",
      cache: false,
      success() {},
      error() {},
    });

    return request;
  },
};
