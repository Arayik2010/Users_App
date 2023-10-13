import dayjs from "dayjs";

export const requestData = async () => {
  const response = await fetch("http://localhost:3001/user");
  const result = await response.json();
  return result;
};


export const updateDataFormat = (data:any) =>{
    return dayjs(data).format("DD MMM YYYY")
  }

export const diffDays = (days:any) => {
    const startDate: any = new Date(days);
    const timeEnd: any = new Date(Date.now());
    const one_day = 1000 * 60 * 60 * 24;
    const diff = Math.floor((timeEnd - startDate) / one_day);
    if(diff > 31) {
      return true
    }else{
      return false
    }
  };