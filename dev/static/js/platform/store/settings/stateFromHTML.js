/* eslint-disable */

import Utils from '../../utils/utils.js';

const utils = new Utils();

const FUNNEL = 'funnel';
const ADDITIONAL = 'additional';
const TRAFFIC = 'traffic';
const BANNERS_SETTINGS = 'banners-settings';
const PUBLIC_REGISTRATION = 'public-registration';
const PAYMENT_FORM_PUBLIC = 'payment-form-public';
const DEALS = 'deals';
const TRANSACTIONS = 'transactions';
const HEAD_MANAGER_TRANSACTIONS = 'head-manager-transactions';
const BILLS = 'bills';
const HEAD_MANAGER_BILLS = 'head-manager-bills';
const CLIENTS_LIST = 'clients-list';
const PAYMENT_FORM_BUILDER = 'payment-form-builder';
const RATING = 'rating';
const A_ADVERTISING = 'a-advertising';
const PERFORMANCE_ASSESSMENT_DEBATE = 'debate';
const BILL_PAYMENT = 'bill-payment';
const MOTIVATION_BUILDER = 'motivation-builder';
const HOMEWORK = 'homework';
const PERFORMANCE_ASSESSMENT = 'performance-assessment';
const COMMON_PLANS = 'common-plans';

class StateFromHTML {
  createState() {
    const page = utils.getPage();
    const prePage = utils.getPage(2);

    this.htmlData = {
      filter: filter ?? null,
      role: role ?? null,
      items: items ?? null,
      today: today ?? null,
      manager: manager ?? null,
      company: company ?? null,
      managers: managers ?? null,
    };

    this.checkPage(page);
    this.checkPrePage(prePage);
  }

  checkPage(page) {
    switch (page) {
      case MOTIVATION_BUILDER: {
        this.htmlData.motivation = {
          pattern,
          departments,
          positions,
          managers,
          advertiser,
          idCompany,
          months,
          updatingBox,
          allPacks,
          company,
        };
        break;
      }
      case BILL_PAYMENT: {
        this.htmlData.client = client ?? null;
        this.htmlData.docs = this.getDocs();
        this.htmlData.bill = bill ?? null;
        break;
      }
      case FUNNEL: {
        this.htmlData.analytics = this.getAnaltycDataGeneral();
        this.htmlData.analyticsFilterData = this.getAnalyticFilterData();
        this.getDealData();
        break;
      }
      case TRAFFIC: {
        this.htmlData.analytics = this.getAnaltycDataTraffic();
        break;
      }
      case ADDITIONAL: {
        this.htmlData.analytics = this.getAnaltycDataAdditional();
        break;
      }
      case BANNERS_SETTINGS: {
        this.htmlData.banners = this.getBannersModules();
        break;
      }
      case DEALS:
      case TRANSACTIONS:
      case HEAD_MANAGER_TRANSACTIONS:
      case CLIENTS_LIST:
      case BILLS:
      case HEAD_MANAGER_BILLS:
      case PAYMENT_FORM_BUILDER:
      case A_ADVERTISING:
      case PERFORMANCE_ASSESSMENT_DEBATE:
      case RATING:
      case PERFORMANCE_ASSESSMENT: {
        this.getDealData();
        break;
      }
      case HOMEWORK: {
        this.htmlData.products = products;
        this.htmlData.funnels = funnels;
        this.htmlData.social = social;

        const changeDealStatusName = this.changeDealStatusName.bind(this);

        const statuses = utils.changeDealStatuses(dealStatuses.map(changeDealStatusName));

        this.htmlData.dealStatuses = statuses;
        this.getDealData();
        break;
      }
      default: {
        break;
      }
      case COMMON_PLANS: {
        this.getPlanData();
      }
    }
  }

  getAnalyticFilterData() {
    return utils.getDeepCopy(filterOptions);
  }

  changeDealStatusName(item) {
    item.title = item.title === 'Рассрочка' ? 'Долями' : item.title;

    return item;
  }

  checkPrePage(prePage) {
    switch (prePage) {
      case PUBLIC_REGISTRATION: {
        this.htmlData.form = this.getFormRegistration();
        this.htmlData.docs = this.getDocs();
        break;
      }
      case PAYMENT_FORM_PUBLIC: {
        this.htmlData.form = this.getFormPublic();
        break;
      }
      default: {
        break;
      }
    }
  }

  getState() {
    return utils.getDeepCopy(this.htmlData);
  }

  getAnaltycDataGeneral() {
    return {
      totalRevenue: totalRevenue ?? null, // Выручка общая
      managerTotalRevenue: managerTotalRevenue ?? null,
      trafficRevenue: trafficRevenue ?? null, // Выручка траффик
      managerTrafficRevenue: managerTrafficRevenue ?? null,
      additionalRevenue: additionalRevenue ?? null, // Выручка База
      managerAdditionalRevenue: managerAdditionalRevenue ?? null,
      advExpenses: advExpenses ?? null, // Раходы на рекламу
      managerAdvExpenses: managerAdvExpenses ?? null,
      shareAdvExpensesTrafficPage: shareAdvExpensesTrafficPage ?? null, // % ДРР (доля рекламных расходов)
      managerShareAdvExpensesTrafficPage: managerShareAdvExpensesTrafficPage ?? null,
      kpd: kpd ?? null, // КПД
      managerKpd: managerKpd ?? null,
      sales: sales ?? null, // Продажи всего
      managerSales: managerSales ?? null,
      salesTraffic: salesTraffic ?? null, // Продажи траффик
      managerSalesTraffic: managerSalesTraffic ?? null,
      salesMailing: salesMailing ?? null, // Продажа рассылка
      managerSalesMailing: managerSalesMailing ?? null,
      salesAdditional: salesAdditional ?? null, // Продажа База
      managerSalesAdditional: managerSalesAdditional ?? null,
      rejectsRow: rejectsRow ?? null, // Отказы
      managerRejectsRow: mRejectsRow ?? null,
      average: average ?? null, // Средний чек 
      managerAverage: managerAverage ?? null,
      averageTrafficMailing: averageTrafficMailing ?? null, // Средний чек траффик
      managerAverageTrafficMailing: managerAverageTrafficMailing ?? null,
      averageAdditional: averageAdditional ?? null, // Средний чек база
      managerAverageAdditional: managerAverageAdditional ?? null,
      profit: profit ?? null, // Выручка общая - расходы на рекламу
      managerProfit: managerProfit ?? null,
      rating: rating ?? null, // Рэйтинг
      managerRating: managerRating ?? null,
      kpdColor: kpdColor ?? null, // КПД цвет
      ratingColor: ratingColor ?? null, // Рейтинг цвет
    }
  }

  getAnaltycDataTraffic() {
    return {
      totalRevenue: totalRevenue ?? null, // Выручка общая
      managerTotalRevenue: managerTotalRevenue ?? null,
      advExpenses: advExpenses ?? null, // Раходы на рекламу
      managerAdvExpenses: managerAdvExpenses ?? null,
      profit: profit ?? null, // Выручка общая - расходы на рекламу
      managerProfit: managerProfit ?? null,
      shareAdvExpensesTrafficPage: shareAdvExpensesTrafficPage ?? null, // % ДРР (доля рекламных расходов)
      managerShareAdvExpensesTrafficPage: managerShareAdvExpensesTrafficPage ?? null,
      kpd: kpd ?? null, // КПД
      managerKpd: managerKpd ?? null,
      advShow: advShow ?? null, // Показов
      managerAdvShow: managerAdvShow ?? null,
      advClick: advClick ?? null, // Кликов
      managerAdvClick: managerAdvClick ?? null,
      advApplication: advApplication ?? null, // Заявок
      managerAdvApplication: managerAdvApplication ?? null,
      importantRow: importantRow ?? null, // Целевых заявок
      managerImportantRow: managerImportantRow ?? null,
      invoices: invoices ?? null, // Заказов
      managerInvoices: managerInvoices ?? null,
      salesNewClient: salesNewClient ?? null, // Продаж
      managerSalesNewClient: managerSalesNewClient ?? null,
      salesNewClientNM: salesNewClientNM ?? null, // Продаж без рассылки
      managerSalesNewClientNM: salesMNewClientNM ?? null,
      salesNewClientM: salesNewClientM ?? null, // Продаж с рассылки
      managerSalesNewClientM: salesMNewClientM ?? null,
      rejectsRow: rejectsRow ?? null, // Отказы
      managerRejectsRow: mRejectsRow ?? null,
      newClientsDo: newClientsDo ?? null, // Новых клиентов по ДО
      managerNewClientsDo: newMClientsDo ?? null,
      newClientsTraffic: newClientsTraffic ?? null, // Новых клиентов с трафика за период
      managerNewClientsTraffic: newMClientsTraffic ?? null,
      newClientsAll: newClientsAll ?? null, // Дотекло клиентов по ДО
      managerNewClientsAll: newMClientsAll ?? null,
      newClientsWithoutMailing: newClientsWithoutMailing ?? null, // Дотекло клиентов по ДО (без рассылки)
      managerNewClientsWithoutMailing: newMClientsWithoutMailing ?? null,
      newClientsWithMailing: newClientsWithMailing ?? null, // Дотекло клиентов по ДО (по рассылке)
      managerNewClientsWithMailing: newMClientsWithMailing ?? null,
      averageCheckTraffic: averageCheckTraffic ?? null, // Средний чек
      managerAverageCheckTraffic: managerAverageCheckTraffic ?? null,
      showPrice: showPrice ?? null, // Стоимость 1000 показов
      managerShowPrice: mShowPrice ?? null,
      clickPrice: clickPrice ?? null, // Стоимость клика
      managerClickPrice: mClickPrice ?? null,
      applicationPrice: applicationPrice ?? null, // Стоимость заявки
      managerApplicationPrice: mApplicationPrice ?? null,
      importantPriceRow: importantPriceRow ?? null, // Стоимость целевой заявки
      managerImportantPriceRow: mImportantPriceRow ?? null,
      invoicePrice: invoicePrice ?? null, // Стоимость заказа
      managerInvoicePrice: mInvoicePrice ?? null,
      clientPrice: clientPrice ?? null, // Стоимость клиента
      managerClientPrice: mClientPrice ?? null,
      clientPriceDo: clientPriceDo ?? null, // Стоимость клиента по ДО
      managerClientPriceDo: mClientPriceDo ?? null,
      showToClick: showToClick ?? null, // CV из показа в клик
      managerShowToClick: mShowToClick ?? null,
      clickToApplication: clickToApplication ?? null, // CV1 из клика в заявку
      managerClickToApplication: mClickToApplication ?? null,
      applicationToInvoice: applicationToInvoice ?? null, // CV2 из заявки в заказ
      managerApplicationToInvoice: mApplicationToInvoice ?? null,
      invoiceToClient: invoiceToClient ?? null, // CV3 из заказа в оплату
      managerInvoiceToClient: mInvoiceToClient ?? null,
      applicationToClient: applicationToClient ?? null, // CV4 из заявки в оплату
      managerApplicationToClient: mApplicationToClient ?? null,
      clickToApplicationDo: clickToApplicationDo ?? null, // CV4 из заявки в оплату по ДО
      managerClickToApplicationDo: mClickToApplicationDo ?? null,
      CV5Row: CV5Row ?? null, // CV из целевой заявки в оплату по ДО
      managerCV5Row: mCV5Row ?? null,
    }
  }

  getAnaltycDataAdditional() {
    return {
      additionalRevenue: additionalRevenue ?? null, // Выручка База
      managerAdditionalRevenue: managerAdditionalRevenue ?? null,
      prescribed: prescribed ?? null, // Кол-во прописанных людей
      managerPrescribed: managerPrescribed ?? null,
      salesAdditional: salesAdditional ?? null, // Продажа База
      managerSalesAdditional: managerSalesAdditional ?? null,
      rejectsRow: rejectsRow ?? null, // Отказы
      managerRejectsRow: mRejectsRow ?? null,
      averageAdditional: averageAdditional ?? null, // Средний чек база
      managerAverageAdditional: managerAverageAdditional ?? null,
      prescribedToSale: prescribedToSale ?? null, // CV из прописанных людей в продажи
      managerPrescribedToSale: managerPrescribedToSale ?? null,
    }
  }

  getBannersModules() {
    return banners ?? null;
  }

  getFormRegistration() {
    return form ?? null;
  }

  getFormPublic() {
    return {
      ...form,
    };
  }

  getStreams() {
    return streams?.length !== 0 ? streams : [];
  }

  getDealData() {
    this.htmlData.saleType = [
      {
        value: 'traffic',
        name: 'Трафик',
      },
      {
        value: 'additional',
        name: 'База',
      }
    ];
    this.htmlData.closeStatusArray = ['closed', 'successfully', 'important'];
  }

  getDocs() {
    return docs?.length ? docs : [];
  }

  getPlanData() {
    this.htmlData.filter = filter;
    this.htmlData.role = role;
    this.htmlData.funnels = funnels;
    this.htmlData.company = company;
    this.htmlData.updatingBox = updatingBox;
    this.htmlData.plans = plans;
    this.htmlData.managers = managers;
    this.htmlData.idCompany = idCompany;
    this.htmlData.years = years;
    this.htmlData.months = utils.getMonths();
    this.htmlData.id = undefined;
    this.htmlData.newFunnel = {};
    this.htmlData.week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  }
}

export default StateFromHTML;
