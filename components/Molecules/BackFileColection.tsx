import Link from "next/link";
import React from "react";
import styles from "@/styles/backFileCollection.module.scss";

const BackFileCollection = ({ title, href }:any) => {
  return (
    <div className={styles.container}>
      <div className={styles.back_link}>
        <Link href={href}>Back to users</Link>
      </div>
      <h1>{title}</h1>
    </div>
  );
};

export default BackFileCollection;