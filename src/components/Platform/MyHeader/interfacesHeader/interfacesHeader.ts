export interface iHeaderTab {
  name: string;
  link: string;
  settings: boolean;
}

export interface iHeaderProps {
  title: string;
  tabs: Array<iHeaderTab>;
  color: boolean;
  settings: boolean;
  border: boolean;
}
