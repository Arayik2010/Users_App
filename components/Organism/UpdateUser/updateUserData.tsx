"use client";

import React, { useState } from "react";
import styles from "@/styles/addUser.module.scss";
import Box from "@/components/Molecules/Box";
import UserModal from "../Modal/modal";
import { useRouter } from 'next/navigation';
import { useStore } from "@/Store/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { requestData } from "@/components/Utils/utils";
import Button from "@/components/Molecules/Button";
import { UpdateUserType } from "@/interface/users";

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^([^0-9]*)$/, "First name should not container number")
      .required("Name is empty"),
    userCurrency: yup
      .number()
      .required("Currency is empty"),
  })
  .required();

const UpdateUserDataForm = ({ responseItem, id }: UpdateUserType) => {
  const [value, setValue] = useState(responseItem.name);
  const [userCurrency, setUserCurrency] = useState(responseItem.currency);
  const [userUpdateModal, setUserUpdateModal] = useState(false);
  const { setUserData } = useStore();
  const router = useRouter()



  console.log(responseItem, 'data')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: responseItem.name, userCurrency: responseItem.currency },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await fetch(`http://localhost:3001/user/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: data.name,
          currency: data.userCurrency,
          createData: Date.now(),
        }),

      });
      setUserData(await requestData());
      setUserUpdateModal(true)

    } catch (error) {
      console.log(error);
    }
    // router.push('/posts/users')
  }
  const handleRequestCloseModal = async () => {
    setUserUpdateModal(false);
    router.push('/users')

  };

  const closeUpdateModal = () => {
    setUserUpdateModal(false)
    router.push('/users')
  }
  return (
    <div className={styles.container_inputs}>
      <form className="validation" onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.name_input}
          {...register("name")}
          id="name"
          type="text"
          placeholder="Name"
          name="name"
        />
        <p className={styles.error_text}>{errors?.name?.message}</p>
        <input
          className={styles.age_input}
          {...register("userCurrency")}
          id="userCurrency"
          type="number"
          placeholder="Currency"
          name="userCurrency"
        />
        <p className={styles.error_text}>{errors?.userCurrency?.message}</p>

        <Button classes={styles.add_button} onClick={handleSubmit(onSubmit)}>
          Update User
        </Button>
      </form>
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
