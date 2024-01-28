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
import UsersService from "@/srevice/users";


const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^([^0-9]*)$/, "First name should not container number")
      .required("Name is empty"),
    userCurrency: yup.number().required("Currency is empty"),
    subscribe: yup.string()
    
  

  })
  .required();

const AddUser = () => {
  const [value, setValue] = useState("");
  const [userCurrency, setUserCurrency] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState<any>(false);

  const { userData, setUserData } = useStore();
  const usersService = UsersService.getInstance();

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
      await usersService.create({
          id: Math.floor(Math.random() * 100),
          name: date.name,
          currency: date.userCurrency,
          createData: new Date(),
          checked: date.subscribe
      });
      setIsOpen(true);
      setUserData(await usersService.listUsers());
      setValue("");
      setUserCurrency("");
    } catch (error) {
      console.log(error);
    }
  }

  const handleRequestCloseModal = async () => {
    // addUserData();
    setIsOpen(false);
    router.push("/users");

    setData(await requestData());
  };

  const handleChange = () => {

    setIsChecked(!isChecked);

  };
  console.log(isChecked, 'checked')

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
        <div className="mt-5  flex item-center pl-4 ">
          <input
            {...register('subscribe')}
            name="subscribe"
            className="w-5 h-5 "
            id="subscribe"
            value={isChecked}
            type="checkbox"
            onChange={handleChange}

          />
          <p className="pl-4 text-sm">Add check</p>
        </div>

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
