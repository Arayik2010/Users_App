import dayjs from "dayjs";

export const updateDataFormat = (data:any) =>{
    return dayjs(data).format("DD MMM YYYY")
  }