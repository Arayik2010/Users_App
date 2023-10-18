"use client";
import { useStore } from "@/Store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Button({ children, onClick, classes }: any) {
  const [is_loader, setIsLoader] = useState(false);
  const {isLoader,changeLoader} = useStore();

  useEffect(() => {
    if(is_loader && !isLoader){
        setIsLoader(false)
    }
  },[isLoader])

  return (
    <div>
      <button
        className={classes}
        onClick={onClick}
      >
      { children } 
      </button>
    </div>
  );
}
