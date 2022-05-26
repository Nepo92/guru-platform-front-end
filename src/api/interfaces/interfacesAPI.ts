export interface iGetBackgroundMonitorInfo {
  id: number;
}

export interface iChangeBackgroundMonitor {
  idCompany: number;
  color: string;
}

export interface iBackgroundInfo {
  color: string;
  colorDefault: null;
  idCompany: number;
}
