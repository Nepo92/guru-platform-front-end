export interface iWidgetMetric {
  green: number;
  yellow: number;
}

export interface iMonitorWidget {
  name: string;
  nameEng: string;
  value: string | number;
  percent: null | number;
  plan?: null | number;
  description: string;
  period: Array<null | number>;
  metric: iWidgetMetric | null;
  tabs: Array<string>;
  units?: null | string;
}
