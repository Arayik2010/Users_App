import React from "react";
import { json } from "stream/consumers";
import Link from "next/link";
import { requestData, updateDataFormat } from "@/components/Utils/utils";
import styles from "../../styles/users.module.scss";
import Box from "@/components/Molecules/Box";
import dynamic from "next/dynamic";
import FileCollectionTitle from "@/components/Molecules/fileCollectionTitle";
import AddUser from "@/components/Organism/AddUser/addUser";
import { revalidateTag } from 'next/cache';

const Graph = dynamic(() => import("@/components/Organism/Graph/graph"), {
  ssr: false,
});
const UserTable = dynamic(
  () => import("@/components/Organism/Table/userTable"),
  {
    ssr: false,
  }
);

async function Page() {
  const response = await fetch("http://localhost:3001/user", {
    next: { revalidate: 0 } 
  
  });
  const resData = await response.json();

  return (
    <div className={styles.container}>
      <AddUser />
      <FileCollectionTitle
        title="User Graph"
        classes={"text-[#535454] font-medium max-w-3xl  pl-4 m-auto"}
      />
      <Box>
        <Graph dataUser={resData} />
      </Box>
      <Box>
        <UserTable resData={resData} />
      </Box>
    </div>
  );
}

export default Page;
