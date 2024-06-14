import React from "react";
import styles from "../../styles/users.module.scss";
import Box from "@/components/Molecules/Box";
import dynamic from "next/dynamic";
import FileCollectionTitle from "@/components/Molecules/fileCollectionTitle";


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
  // const usersService = UsersService.getInstance();
  // const resData = await usersService.listUsers()
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/user', {
    cache: 'no-store',

  });
  const resData = await response.json();

  return (
    <div className={styles.container}>
      <FileCollectionTitle
        title="User Graph"
        classes={"text-[#535454] font-medium max-w-3xl  pl-4 m-auto"}
      />
      <Box>
        <Graph dataUser={resData} />
      </Box>
      <FileCollectionTitle
        title="User Data"
        link={{
          linkRef :"/users/add",
          text : "Add user",
        }}
        classBlock={"flex justify-between item-center max-w-3xl m-auto pr-4"}
        classes={"text-[#535454] font-medium max-w-3xl  pl-4 "}
      />
      <Box>
        <UserTable resData={resData} />
      </Box>
    </div>
  );
}

export default Page;
