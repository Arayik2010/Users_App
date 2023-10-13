export type IUser = {
  id: number | string;
  name: string;
  currency: string;
  createData: string;
};

export type IPopoverType = {
  children: any;
  containerClassName: string;
};

export type IUpdateType = {
  responseItem: IUser,
  id: string | number,
};
