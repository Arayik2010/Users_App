export type IUser = {
  id: number | string;
  name: string;
  currency: number;
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

export type UpdateUserType = {
  responseItem: IUser;
  id: string
}
