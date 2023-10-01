"use client";

import React, { useState } from "react";
import styles from "@/styles/users.module.scss";
import Box from "@/components/Molecules/Box";
import UserModal from "../Modal/modal";
import { useRouter } from 'next/navigation';
import { useStore } from "@/Store/store";
import { requestData } from "@/components/Utils/utils";

const UpdateUserDataForm = ({responseItem,id}:any) => {
  const [value, setValue] = useState(responseItem.name);
  const [userCurrency, setUserCurrency] = useState(responseItem.currency);
  const [userUpdateModal, setUserUpdateModal] = useState(false);
  const { setUserData } = useStore();
  const router = useRouter()

  
  const updateUserData = async() =>{
    try {
      await fetch(`http://localhost:3001/user/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: value,
          currency: userCurrency,
          createData: responseItem.createData,
        }),
        
      });
      setUserData(await requestData());
      
    } catch (error) {
      console.log(error);
    }
    // router.push('/posts/users')
  }
  const handleRequestCloseModal = async () => {
    updateUserData();
    setUserUpdateModal(false);
    router.push('/users')
   
  };

  const closeUpdateModal = () =>{
    setUserUpdateModal(false)
    router.push('/users')
  }
  return (
    <div className={styles.container_inputs}>
      <Box>
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

        <button className={styles.add_button} onClick={()=> setUserUpdateModal(true)}>
          Update user
        </button>
      </Box>
      <UserModal
       onlyConfirmButton={true}
       handlerRequest={() => handleRequestCloseModal()}
        modalIsOpen={userUpdateModal}
        contentTitle={`User ${value} update your data`}
        closeModal={closeUpdateModal}
      />
    </div>
  );
};

export default UpdateUserDataForm;