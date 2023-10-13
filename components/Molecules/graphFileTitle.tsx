import { GraphCollectinTitleType } from "@/interface/fileCollectioTitle";
import React, { useEffect, useState } from "react";

const GraphFileTitle = ({ classes, title, graphCurrency }: GraphCollectinTitleType) => {
  const [formatCurrency, setFormatCurrency] = useState<number | string>(0);

  const numberWithCommas = () => {
    graphCurrency = graphCurrency.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(graphCurrency))
      graphCurrency = graphCurrency.replace(pattern, "$1,$2");
    return setFormatCurrency(graphCurrency);
  };

  useEffect(() => {
    numberWithCommas();
  }, [graphCurrency]);

  return (
    <div className="mt-4 flex justify-between">
      <h1 className={classes}>{title}</h1>
      <h2 className="text-black font-medium"> {`USD ${formatCurrency}`}</h2>
    </div>
  );
};
export default GraphFileTitle;
