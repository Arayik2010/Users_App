"use client"

import React, { useEffect, useState } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
import moment, { utc } from "moment/moment";
import GraphFileTitle from "@/components/Molecules/graphFileTitle";

const Graph = ({ dataUser }:any) => {
  const [allUserCurrency, setAllUserCurrency] = useState(0);

  const getUserCurrency = () => {
    const initialValue = 0;
    const sumWithInitial = dataUser.reduce(
      (accumulator:any, currentValue:any) =>
        accumulator + parseInt(currentValue.currency),
      initialValue
    );
    setAllUserCurrency(sumWithInitial);
  };

  useEffect(() => {
    getUserCurrency();
  }, [dataUser]);

  const dataFormat = (data:any, elemData:any) => {
    return data && data.length <= 7
      ? moment(elemData).format("dddd").slice(0, 3)
      : (data.length >= 7 && data.length) <= 31
      ? moment(elemData).format("L").slice(3, 5)
      : moment(elemData).format("MMM Do YY").slice(0, 3);
  };

  const configData = dataUser?.map((el:any) => {
    return {
      weekDate: dataFormat(dataUser, el.createData),
      name: el.name,
      currency: el.currency,
    };
  });
  return (
    <>
      <GraphFileTitle
        title="Our Graph Information"
        graphCurrency={allUserCurrency}
        classes={"text-[#4599F2] font-medium max-w-3xl"}
      />
      <AreaChart
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
        <XAxis dataKey="weekDate" />
        <YAxis dataKey="currency" />
        <Area dataKey="name" stroke="#8884d8" fill="#8884d8" />
        <Area dataKey="currency" stroke="#8884d8" fill="#8884d8" />
        <Tooltip />
      </AreaChart>
    </>
  );
};
export default Graph;
