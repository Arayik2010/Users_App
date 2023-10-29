"use client";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import moment, { utc } from "moment/moment";
import GraphFileTitle from "@/components/Molecules/graphFileTitle";
import { useStore } from "@/Store/store";
import { IUser } from "@/interface/users";


const options = [
  { value: "7 days", label: "7 Days" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const Graph = ({ dataUser }: any) => {
  const [allUserCurrency, setAllUserCurrency] = useState(0);
  const [selectedOption, setSelectedOption] = useState<any>(options[0]);
  const [data, setData] = useState(dataUser || []);
  const [days, setDays] = useState<any>([]);
  const { userData } = useStore();

  useEffect(() => {
    getUserCurrency();
    setData(userData.length ? userData : dataUser);
  }, [dataUser, userData,selectedOption]);

  
  useEffect(() => {

    const weekDays:any = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      weekDays.push(moment(date).format('dddd').slice(0,3));
      
    }
    setDays(weekDays);
  }, []);

  const getUserCurrency = () => {
    const initialValue = 0;
    const sumWithInitial = data.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + parseInt(currentValue.currency),
      initialValue
    );
    setAllUserCurrency(sumWithInitial);
  };

  const periodDays = (selected: any) => {
    setSelectedOption(selected)
    const weekDays:any = []
    const daysMonth:any = []
    console.log(selected,'dddd')
    if(selected.value === "month"){
      for(let i = 0; i < 31; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        daysMonth.push(moment(date).format('L').slice(3,5))
      }
      setDays(daysMonth)
    }if(selected.value === "7 days") {
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        weekDays.push(moment(date).format('dddd').slice(0,3)); 
      }
      setDays(weekDays);
    }
  }

  const dataFormat = (data: any, elemData: any) => {
    return data && data.length <= 7
      ? moment(elemData).format("dddd").slice(0, 3)
      : (data.length >= 7 && data.length) <= 31
      ? moment(elemData).format("L").slice(3, 5)
      : moment(elemData).format("MMM Do YY").slice(0, 3);
  };

  const configData = data?.map((el: any) => {
    return {
      weekDate: days,
      name: el.name,
      currency: el.currency,
    };
  });


  return (
    <div>
      <div className="flex justify-between gap-4 items-center">
        <GraphFileTitle
          title="Our Graph Information"
          graphCurrency={allUserCurrency}
          classes={"text-[#4599F2] font-medium max-w-3xl"}
        />
        <Select
          className="w-36"
          defaultValue={selectedOption}
          onChange={periodDays}
          options={options}
        />
      </div>

      <LineChart
        width={730}
        height={250}
        data={configData}
        margin={{
          top: 30,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis  dataKey="weekDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="name" stroke="#8884d8" />
        <Line type="monotone" dataKey="currency" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};
export default Graph;
