import BackFileCollection from "@/components/Molecules/BackFileColection";
import Box from "@/components/Molecules/Box";
import { updateDataFormat } from "@/components/Utils/utils";
import styles from "@/styles/users.module.scss";
import { type } from "os";
import React from "react";

// import { Layout } from "../../..//components/Layouts/layout";

interface UserProps {
  params: any;
}

export async function UserItem({ params: { id } }: UserProps) {
  const requestItem = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/user/${id}`,
    {
      cache: "no-store",
    }
  );
  const responseItem = await requestItem.json();

  return (
    <div>
      <BackFileCollection title="Custom User Data" href="/users" />
      <Box>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.tr}>
              <th className={styles.th} scope="col">
                User
              </th>
              <th className={styles.th} scope="col">
                Currency
              </th>
              <th className={styles.th} scope="col">
                Update at
              </th>
              <th className={styles.th} scope="col">
                Action
              </th>
            </tr>
            <tr className={styles.tr}>
              <th className={styles.th} scope="row">
                {responseItem.name}
              </th>
              <td className={styles.td}>{responseItem.currency}</td>
              <td className={styles.td}>
                {updateDataFormat(responseItem.createData)}
              </td>
              <td className={styles.td}></td>
            </tr>
          </tbody>
        </table>
      </Box>
    </div>
  );
}
// UserItem.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };

export default UserItem;
