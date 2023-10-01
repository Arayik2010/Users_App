import React, { useState } from "react";
import { Popover } from "react-tiny-popover";
// import Popover from "@mui/material/Popover";
// import Typography from "@mui/material/Typography";
// import { StyledEngineProvider } from "@mui/material/styles";
import Image from "next/image";

const PagePopover = ({children, containerClassName}:any) => {
  const [anchorEl, setAnchorEl] = useState<any>();

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Popover
        isOpen={anchorEl}
        onClickOutside={handleClose}
        positions={["top", "left",]} 
        containerClassName={containerClassName}
        content={<div  className="bg-yellow-300 mt-8 p-3 rounded">{children}</div>}
      >
        <div>
          {" "}
          <Image
            onClick={handleClick}
            className="m-auto cursor-pointer"
            src="/three_dots.png"
            width={25}
            height={25}
            alt=""
          />
        </div>
      </Popover>
    </div>
  );
};

export default PagePopover;