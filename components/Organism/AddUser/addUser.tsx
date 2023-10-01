"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/addUser.module.scss";
import { requestData } from "@/components/Utils/utils";
import { useStore } from "@/Store/store";
import UserModal from "../Modal/modal";

const AddUser = () => {
  const [value, setValue] = useState("");
  const [userCurrency, setUserCurrency] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();

  const { userData, setUserData } = useStore();

  const closeModal = () => {
    setIsOpen(false);
  };

  const addUserData = async () => {
    try {
      await fetch("http://localhost:3001/user", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: Math.floor(Math.random() * 100),
          name: value,
          currency: userCurrency,
          createData: new Date(),
        }),
      });
      setIsOpen(false);
      setUserData(await requestData());
      setValue("");
      setUserCurrency("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestCloseModal = async () => {
    addUserData();
    setIsOpen(false);
    setData(await requestData());
  };

  return (
    <div className={styles.container_inputs}>
      <input
        className={styles.name_input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        className={styles.age_input}
        type="number"
        value={userCurrency}
        onChange={(e) => setUserCurrency(e.target.value)}
      />

      <button className={styles.add_button} onClick={() => setIsOpen(true)}>
        add user
      </button>
      <UserModal
        onlyConfirmButton={true}
        handlerRequest={() => handleRequestCloseModal()}
        modalIsOpen={modalIsOpen}
        contentTitle={`User ${value} will add in list`}
        closeModal={closeModal}
      />
    </div>
  );
};

export default AddUser;
