import React from "react";
import styles from "../../styles/users.module.scss";
import Box from "@/components/Molecules/Box";
import dynamic from "next/dynamic";
import FileCollectionTitle from "@/components/Molecules/fileCollectionTitle";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const Graph = dynamic(() => import("@/components/Organism/Graph/graph"), {
  ssr: false,
});
const UserTable = dynamic(
  () => import("@/components/Organism/Table/userTable"),
  {
    ssr: false,
  }
);

async function getData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      redirect("/");
    }
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function Page() {
  const resData = await getData();

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
          linkRef: "/users/add",
          text: "Add user",
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
