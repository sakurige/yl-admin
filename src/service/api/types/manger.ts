export interface Manger {
  id: number;
  avatar: string;
  role: {
    id: number;
    name: string;
  };
  ruleNames: string[];
  username: string;
  menus: MenuType[];
}

export interface MenuType {
  id: number;
  ruleTd: number;
  status: number;
  createTime: string;
  updateTime: string;
  name: string;
  desc: string;
  frontPath: string;
  condition?: any;
  menu: number;
  order: number;
  icon: string;
  method: string;
  child: MenuType[];
}
