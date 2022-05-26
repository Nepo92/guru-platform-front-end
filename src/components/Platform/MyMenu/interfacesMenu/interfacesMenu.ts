export interface iMenuItem {
  roles: Array<string>;
  path: Array<string>;
  name: string;
  class: string;
  submenu: iSubMenu | undefined;
}

export interface iSubMenu {
  items: Array<iSubMenuItem>;
}

export interface iSubMenuItem {
  path: Array<string>;
  name: string;
  class: string;
}

export interface iHoverProps {
  target: HTMLElement;
  index: number | null;
}
