import { IUser } from "@/interface/users";
import React from "react";
import { json } from "stream/consumers";
import Link from "next/link";
import { updateDataFormat } from "@/components/Utils/utils";
import styles from "../../styles/users.module.scss";
import Box from "@/components/Molecules/Box";
import Graph from "@/components/Organism/Graph/graph";

async function Page() {
  const res = await fetch("http://localhost:3001/user");
  const resData = await res.json();

  console.log(resData);
  return (
    <div className={styles.container}>
      <Box>
          <Graph dataUser={resData} />
        </Box>
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
            {resData &&
              resData.map((el: IUser) => (
                <tr className={styles.tr} key={el.id}>
                  <th className={styles.th} scope="row">
                    <Link href={`/users/${el.id}`}>{el.name}</Link>
                  </th>
                  <td className={styles.td}>{el.currency}</td>
                  <td className={styles.td}>
                    {updateDataFormat(el.createData)}
                  </td>
                  <td className={styles.td}>
                    {/* <PagePopover containerClassName='mt-16'>
                        <button
                          onClick={() => setDeleteOpenModal(el)}
                          className={styles.button}
                        >
                          Delete
                        </button>
                        <Link
                          className="ml-2"
                          href={`/posts/users/edit/${el.id}`}
                        >
                          <button className={styles.button}>Details</button>
                        </Link>
                      </PagePopover> */}
                    delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}

export default Page;
