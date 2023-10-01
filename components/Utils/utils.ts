import dayjs from "dayjs";

export const requestData = async () => {
  const response = await fetch("http://localhost:3001/user");
  const result = await response.json();
  return result;
};


export const updateDataFormat = (data:any) =>{
    return dayjs(data).format("DD MMM YYYY")
  }