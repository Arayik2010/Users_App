import React from "react";
import styles from "@/styles/mainContainer.module.scss";

export const PrimeryButton = ({ name, onClick }: any) => {
  return (
    <div>
      <button className={styles.button_style} onClick={onClick}>
        {name}
      </button>
    </div>
  );
};
