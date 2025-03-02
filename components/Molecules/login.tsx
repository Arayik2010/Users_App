"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "@/styles/mainContainer.module.scss";
import { MainContainer } from "./mainContainer";
import InputGroup from "./InputGroup";
import { PrimeryButton } from "./PrimeryButton";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("email is empty"),
  password: yup.string().required("password is empty"),
});

const Login = () => {
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
    event.preventDefault();
    const requestData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/login",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token to localStorage
      localStorage.setItem("token", data.token);
      router.push("/users");
      console.log("Token Stored:", data.token); // Debugging
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <MainContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <PrimeryButton name="Login" />
      </form>
      <Link className="text-blue-600 " href="/register">
        Sign up
      </Link>
    </MainContainer>
  );
};

export default Login;
