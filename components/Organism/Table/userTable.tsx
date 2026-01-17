"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IUser } from "@/interface/users";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { diffDays, updateDataFormat } from "@/components/Utils/utils";
import PagePopover from "../pagePopover";
import { useStore } from "@/Store/store";
import UserModal from "../Modal/modal";
import WarningIcon from "@/components/Icons/warningIcon";
import ChackedIcon from "@/components/Icons/checkedIcon";
import useDebunce from "@/hooks/useDebunce";
import UsersService from "@/srevice/users";
import styles from "@/styles/table.module.scss";

const UserTable = ({ resData }: any) => {
  const [data, setData] = useState(resData || []);
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [chunkData, setChunkData] = useState<any>([]);
  const [value, setValue] = useState("");
  const [deleteOpenModal, setDeleteOpenModal] = useState<any>(false);
  const { userData, setUserData } = useStore();
  const debunceSearchHandle = useDebunce(searchDataUser, 500);
  const usersService = UsersService.getInstance();
  let pageSize = 5;

  const chunk = data.reduce(
    (acc: any, _: any, i: any) =>
      i % pageSize ? acc : [...acc, data && data.slice(i, i + pageSize)],
    []
  );

  useEffect(() => {
    setPageCount(Math.ceil(data.length / pageSize));
    const dataChunk = chunk[activePage - 1];
    setChunkData(dataChunk);
  }, [activePage, data, userData]);

  useEffect(() => {
    setData(userData.length ? userData : resData);
  }, [userData]);

  const closeDeleteModal = () => {
    setDeleteOpenModal(false);
  };

  const deleteRecord = async (id: string) => {
    try {
      await usersService.itemDelete(id);
      const response = await usersService.listUsers();
      console.log(response);
      setUserData(response.data);
      setDeleteOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function searchDataUser(userName: string) {
    try {
      const resData = await usersService.searchListItem(userName);
      console.log(resData.data, "data");
      setData(resData.data);
    } catch (e) {
      console.log(e);
    }
  }

  const onChnage = (e: any) => {
    setValue(e.target.value);
    debunceSearchHandle(e.target.value);
  };

  return (
    <div className="w-full">
      <input
        className={styles.search_input}
        placeholder="search..."
        type="text"
        onChange={onChnage}
      />
      {createPortal(
        <p>This child is placed in the document body.</p>,
        document.body
      )}
      <table className={styles.table}>
        <tbody>
          <tr className={styles.tr}>
            <th className={styles.th} scope="col">
              User Name
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
              <tr className={styles.tr} key={el._id}>
                <th className={styles.th} scope="row">
                  <Link href={`/users/${el._id}`}>{el.name}</Link>
                </th>
                <td className={styles.td}>
                  {" "}
                  {el.checked ? "$" : "AMD"} {el.currency}
                </td>
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
                      <Link className="ml-2" href={`/users/edit/${el._id}`}>
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
        handlerRequest={() => deleteRecord(deleteOpenModal._id)}
        modalIsOpen={!!deleteOpenModal}
        contentTitle={`User deleted from list`}
        closeRequestModal={closeDeleteModal}
        handleDeleteButton={"Delete"}
        handleDeclineButton={"Cansel"}
        deleteButtonClass="px-10 py-2 bg-delete_button text-delete_text"
        declineButtonClass="px-10 py-2 border-black  text-cancel_text"
      />
    </div>
  );
};

export default UserTable;
