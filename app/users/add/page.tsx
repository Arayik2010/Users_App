"use client";
import React, { useState } from "react";
import styles from "@/styles/addUser.module.scss";
import { useForm } from "react-hook-form";
import { useStore } from "@/Store/store";
import { yupResolver } from "@hookform/resolvers/yup";
import UserModal from "@/components/Organism/Modal/modal";
import { useRouter } from "next/navigation";
import Button from "@/components/Molecules/Button";
import UsersService from "@/srevice/users";
import BackFileCollection from "@/components/Molecules/BackFileColection";
import { addUserSchema } from "@/components/Utils/schema";

const AddUser = () => {
  const [value, setValue] = useState("");
  const [userCurrency, setUserCurrency] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
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
    resolver: yupResolver(addUserSchema),
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data: any) => {
    try {
      await usersService.create({
        name: data.name,
        currency: data.userCurrency,
        createData: new Date(),
        checked: data.subscribe,
      });
      setIsOpen(true);
      setValue(data.name);
      const response = await usersService.listUsers();
      setUserData(response.data);
      setUserCurrency("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestCloseModal = async () => {
    setIsOpen(false);
    router.push("/users");
  };

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-full">
      <BackFileCollection title="Custom User Data" href="/users" />
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
              {...register("subscribe")}
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
    </div>
  );
};

export default AddUser;
