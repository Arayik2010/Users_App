"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/table.module.scss";
import { IUser } from "@/interface/users";
import Link from "next/link";
import {
  diffDays,
  requestData,
  updateDataFormat,
} from "@/components/Utils/utils";
import PagePopover from "../pagePopover";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useStore } from "@/Store/store";
import UserModal from "../Modal/modal";
import Image from "next/image";
import WarningIcon from "@/components/Icons/warningIcon";
import ChackedIcon from "@/components/Icons/checkedIcon";

const UserTable = ({ resData }: any) => {
  const [data, setData] = useState(resData || []);
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [chunkData, setChunkData] = useState<any>([]);
  const [deleteOpenModal, setDeleteOpenModal] = useState<any>(false);
  const { userData, setUserData } = useStore();
  let pageSize = 5;

  const chunk = data.reduce(
    (acc: any, _: any, i: any) =>
      i % pageSize ? acc : [...acc, data && data.slice(i, i + pageSize)],
    []
  );
  console.log(chunkData, 'ggg')

  const sortUsers = (users: any) => {

    const sortItems = users.sort((a: any, b: any) => a.currency - b.currency)
    return sortItems


  }


  useEffect(() => {
    sortUsers(chunkData)
  })

  useEffect(() => {
    setPageCount(Math.ceil(data.length / pageSize));
    const dataChunk = chunk[activePage - 1];
    setChunkData(dataChunk);
  }, [activePage, data, userData]);

  useEffect(() => {
    setData(userData.length ? sortUsers(userData) : sortUsers(resData));
  }, [userData]);

  const closeDeleteModal = () => {
    setDeleteOpenModal(false);
  };

  const deleteRecord = async (id: string) => {
    try {
      await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/user/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => setData(res));
      setUserData(await requestData());
      setDeleteOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const searchDataUser = async (userName: string) => {
    await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/user?name=${userName}`)
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  return (
    <div className="w-full">
      <input
        className={styles.search_input}
        placeholder="search..."
        type="text"
        onChange={(e) => searchDataUser(e.target.value)}
      />
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
          {chunkData &&
            chunkData.map((el: IUser) => (
              <tr className={styles.tr} key={el.id}>
                <th className={styles.th} scope="row">
                  <Link href={`/users/${el.id}`}>{el.name}</Link>
                </th>
                <td className={styles.td}> {el.checked ? '$' : 'AMD'} {el.currency}</td>
                <td className={styles.td}>{updateDataFormat(el.createData)}</td>
                <td className={styles.td}>
                  <div className="flex justify-center items-center">
                    {diffDays(el.createData) ? (
                      <div>
                        <WarningIcon />
                      </div>
                    ) : (
                      <div>
                        <ChackedIcon />
                      </div>
                    )}
                    <PagePopover containerClassName="mt-16">
                      <button
                        onClick={() => setDeleteOpenModal(el)}
                        className={styles.button}
                      >
                        Delete
                      </button>
                      <Link className="ml-2" href={`/users/edit/${el.id}`}>
                        <button className={styles.button}>Details</button>
                      </Link>
                    </PagePopover>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Stack spacing={2}>
        <Pagination
          onClick={(e: any) => {
            setActivePage(+e.target.innerText);
          }}
          count={pageCount}
          shape="rounded"
        />
      </Stack>
      <UserModal
        showHandleButtons={true}
        id={"0"}
        handlerRequest={() => deleteRecord(deleteOpenModal.id)}
        modalIsOpen={!!deleteOpenModal}
        contentTitle={`User deleted from list`}
        closeRequestModal={closeDeleteModal}
        handleDeleteButton={"Delete"}
        handleDeclineButton={"Cansel"}
        deleteButtonClass="px-10 py-2 bg-red-500 text-white"
        declineButtonClass="px-10 py-2 border-black  text-black"
      />
    </div>
  );
};

export default UserTable;
