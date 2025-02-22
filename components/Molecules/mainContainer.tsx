import React from "react";
import styles from "@/styles/mainContainer.module.scss";

export const MainContainer = ({ children }: any) => {
  return <div className={styles.mainContainer}>{children}</div>;
};
