export interface interfaceCompany {
	about: boolean;
	bookmarks: boolean;
	companyCode: string;
	events: boolean;
	faq: boolean;
	id: number;
	isPartner: boolean;
	legalName: string;
	logo: string;
	name: string;
	production: boolean;
	regulations: boolean;
	training: boolean;
}

export type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

export interface iLineColor {
	doubleGreen: number;
	doubleRed: number;
	doubleYellow: number;
	green: string;
	id: number;
	line: string;
	name: string;
	red: string;
	yellow: string;
}

export interface iFunnelVisible {
	blockAdvertisingExpenses: boolean;
	blockApplicationToBill: boolean;
	blockApplicationToClient: boolean;
	blockApplicationToClientDO: boolean;
	blockApplications: boolean;
	blockAverage: boolean;
	blockAveragePrepayment: boolean;
	blockAverageSurcharge: boolean;
	blockBillToClient: boolean;
	blockBills: boolean;
	blockClickToApplication: boolean;
	blockClicks: boolean;
	blockClient: boolean;
	blockClientDO: boolean;
	blockClientsDO: boolean;
	blockClientsTraffic: boolean;
	blockKPD: boolean;
	blockPercentNetProceed: boolean;
	blockPrepaymentProceed: boolean;
	blockPriceApplication: boolean;
	blockPriceBill: boolean;
	blockPriceClick: boolean;
	blockPriceShows: boolean;
	blockProceed: boolean;
	blockProceedAdvertisingExpenses: boolean;
	blockSales: boolean;
	blockSalesDo: boolean;
	blockSalesDoWithMailing: boolean;
	blockSalesDoWithoutMailing: boolean;
	blockSalesWithSales: boolean;
	blockSalesWithoutSales: boolean;
	blockShowToClick: boolean;
	blockShows: boolean;
	blockSurchargeProceed: boolean;
	blockSurcharges: boolean;
}

export interface iPlatformFilter {
	active?: boolean;
	canClear?: boolean;
	channel?: string;
	communites?: Array<string>;
	community?: string;
	course?: string;
	dealType?: null | string;
	endDate?: string;
	endDateChart?: string;
	groupingType?: number;
	idCompany?: number;
	idFunnel?: number;
	idManager?: number;
	idSort?: number;
	idUser?: number;
	isMailing?: boolean;
	isNotDismiss?: null | boolean;
	isTraffic?: boolean;
	lineColors?: Array<iLineColor>;
	periodType?: string;
	platform?: string;
	project?: number;
	scrollType?: number;
	startDate?: string;
	startDateChart?: string;
	target?: string;
	visableSettings?: iFunnelVisible;
	year?: string;
}

export interface iManager {
	avatar: null | string;
	currentScore: number;
	id: number;
	idCompany: number;
	idUser: number;
	isNeedShow: boolean;
	link: string;
	name: string;
	notDisMiss: boolean | null;
	type: null;
	typeTitle: null;
}
