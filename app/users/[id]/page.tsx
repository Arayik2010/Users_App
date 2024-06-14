import ChackedIcon from "@/components/Icons/checkedIcon";
import WarningIcon from "@/components/Icons/warningIcon";
import BackFileCollection from "@/components/Molecules/BackFileColection";
import Box from "@/components/Molecules/Box";
import { diffDays, updateDataFormat } from "@/components/Utils/utils";
import UsersService from "@/srevice/users";
import styles from "@/styles/users.module.scss";
import { type } from "os";
import React from "react";


interface UserProps {
  params: any;
}
const usersService = UsersService.getInstance();
export async function UserItem({ params: { id } }: UserProps) {
  const responseItem: any = await usersService.listUsers(id, { cache: "no-store", })

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
                {responseItem.data.name}
              </th>
              <td className={styles.td}>{responseItem.data.currency}</td>
              <td className={styles.td}>
                {updateDataFormat(responseItem.data.createData)}
              </td>
              <td className={styles.td}>
              <div className="flex justify-center items-center">
                {diffDays(responseItem.data.createData) ? (
                  <div>
                    <WarningIcon />
                  </div>
                ) : (
                  <div>
                    <ChackedIcon />
                  </div>
                )}
                </div>
              </td>
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
