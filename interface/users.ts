export type IUser = {
  _id: number | string;
  name: string;
  currency: string;
  createData: string;
  checked?: boolean
};

export type IPopoverType = {
  children: any;
  containerClassName: string;
};

export type IUpdateType = {
  responseItem: IUser,
  id: string | number,
};
