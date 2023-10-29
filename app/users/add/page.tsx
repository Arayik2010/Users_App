"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/addUser.module.scss";
import { useForm } from "react-hook-form";
import { requestData } from "@/components/Utils/utils";
import { useStore } from "@/Store/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UserModal from "@/components/Organism/Modal/modal";
import { useRouter } from "next/navigation";
import Button from "@/components/Molecules/Button";

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^([^0-9]*)$/, "First name should not container number")
      .required("Name is empty"),
    userCurrency: yup.number().required("Currency is empty"),
  })
  .required();

const AddUser = () => {
  const [value, setValue] = useState("");
  const [userCurrency, setUserCurrency] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const router = useRouter();

  const { userData, setUserData } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async (date: any) => {
    try {
      await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/user", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: Math.floor(Math.random() * 100),
          name: date.name,
          currency: date.userCurrency,
          createData: new Date(),
        }),
      });
      setIsOpen(true);
      setUserData(await requestData());
      setValue("");
      setUserCurrency("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestCloseModal = async () => {
    // addUserData();
    setIsOpen(false);
    router.push("/users");

    setData(await requestData());
  };

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
          Add
        </Button>
      </form>

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
