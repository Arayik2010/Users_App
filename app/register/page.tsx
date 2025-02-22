"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as yup from "yup";
import InputGroup from "@/components/Molecules/InputGroup";
import { MainContainer } from "@/components/Molecules/mainContainer";
import { PrimeryButton } from "@/components/Molecules/PrimeryButton";
import styles from "@/styles/mainContainer.module.scss";

const schema = yup.object().shape({
  name: yup.string().required("name is empty"),
  email: yup
    .string()
    .email("Email should have correct format")
    .required("email is empty"),
  password: yup.string().required("password is empty"),
});

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any, event: any) => {
    event.preventDefault(); // Prevent default form submission
    const requestData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log("Request submitted successfully!");
        router.push("/");
      } else {
        console.error("Failed to submit request.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={styles.container}>
      <MainContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup
            register={{ ...register("name") }}
            id="name"
            type="name"
            label="name"
            name="name"
          />
          <p className={styles.error_text}>{errors?.name?.message}</p>

          <InputGroup
            register={{ ...register("email") }}
            id="email"
            type="email"
            label="Email"
            name="email"
          />
          <p className={styles.error_text}>{errors?.email?.message}</p>

          <InputGroup
            register={{ ...register("password") }}
            id="password"
            type="password"
            label="Password"
            name="password"
          />

          <p className={styles.error_text}>{errors?.password?.message}</p>
          <PrimeryButton name="Register" />
        </form>
        <Link className="text-blue-600 " href="/">
          Sign in
        </Link>
      </MainContainer>
    </div>
  );
};

export default Register;
