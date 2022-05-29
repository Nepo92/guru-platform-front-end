import { Ref } from "vue";

export interface iAnalyticRowProperties {
  sum: number;
  sums: Array<number>;
}

export interface iAnalyticRowManagersProperties {
  sum: number;
  sums: Array<number>;
  [key: number]: iAnalyticRowProperties;
}

export interface iMetricColor {
  green: number;
  yellow: number;
  red: number;
}

export interface iAnalyticRow {
  name: string;
  main: iAnalyticRowProperties;
  managers: iAnalyticRowManagersProperties;
  units: string;
  visible?: boolean;
  colors?: iMetricColor;
}

export interface iCurrentAnalytic {
  tabs: string;
  items: Array<iAnalyticRow>;
}

export interface iCurrentProps {
  searchRow: Ref<string>;
  rows: Array<iCurrentAnalytic>;
  activeTab: string;
  colors: iAnalyticColors;
}

export interface iAnalyticColors {
  kpdColor: iMetricColor;
  ratingColor: iMetricColor;
}

export interface iGetPeriodItemsProps {
  currentRows: Ref<Array<iAnalyticRow>>;
  start: number;
  periodSeparate: number;
  months: Array<string>;
  periodLength?: number;
}
