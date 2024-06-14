"use client";
import React, { useState } from "react";
import styles from "@/styles/addUser.module.scss";
import UserModal from "../Modal/modal";
import { useRouter } from 'next/navigation';
import { useStore } from "@/Store/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "@/components/Molecules/Button";
import UsersService from "@/srevice/users";
import { updateUserSchema } from "@/components/Utils/schema";

const UpdateUserDataForm = ({ responseItem, id }: any) => {
  const [value, setValue] = useState(responseItem.name);
  const [userUpdateModal, setUserUpdateModal] = useState(false);
  const { userData, setUserData } = useStore();
  const [isChecked, setIsChecked] = useState<any>(responseItem.checked);
  const usersService = UsersService.getInstance();

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:
    {
      name: responseItem.name,
      userCurrency: responseItem.currency,
      subscribe: responseItem.checked
    },
    mode: "onBlur",
    resolver: yupResolver(updateUserSchema),
  });

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const onSubmit = async (data: any) => {
    try {
      await usersService.update(id, {
        name: data.name,
        currency: data.userCurrency,
        createData: Date.now(),
        checked: data.subscribe
      });
      const response = await usersService.listUsers()
      setUserData(response.data);
      setUserUpdateModal(true)
    } catch (error) {
      console.log(error);
    }
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
      <form className="validation w-[70%]" onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.name_input}
          {...register("name")}
          id="name"
          type="text"
          placeholder="Name"
          name="name"
        />
        <p className={styles.error_text}>{responseItem.name && errors?.name?.message}</p>
        <input
          className={styles.age_input}
          {...register("userCurrency")}
          id="userCurrency"
          type="number"
          placeholder="Currency"
          name="userCurrency"
        />
        <p className={styles.error_text}>{responseItem.currency && errors?.userCurrency?.message}</p>
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
          Update User
        </Button>
      </form>
      <UserModal
        onlyConfirmButton={true}
        handlerRequest={() => handleRequestCloseModal()}
        modalIsOpen={userUpdateModal}
        contentTitle={`User ${value} updated data`}
        closeModal={closeUpdateModal}
      />
    </div>
  );
};

export default UpdateUserDataForm;
