import React from "react";
import { MainRoutes } from "../Utils/main.routes";
import NavLink from "../Molecules/NavLink";

const Navigation = () => {
  return (
    <div className="flex gap-20 justify-center w-1/2 m-auto">
      {MainRoutes?.map((route: any, index) => (
        <NavLink key={index} routes={route} />
      ))}
    </div>
  );
};
export default Navigation;
