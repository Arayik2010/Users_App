"use client";

import React from "react";
import Navigation from "./navigation";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const logOut = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="bg-black text-white ">
      <Navigation />
      <button className="text-white" onClick={logOut}>
        Log Out
      </button>
    </div>
  );
};

export default Header;
