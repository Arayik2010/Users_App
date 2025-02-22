import React from "react";
import styles from "@/styles/mainContainer.module.scss";
const Input = ({
  id,
  type,
  placeholder,
  name,
  label,
  register,
  ...props
}: any) => {
  return (
    <div>
      <input
        className={styles.input_style}
        placeholder={placeholder}
        {...register}
        type={type}
        id={id}
        name={name}
        label={label}
        {...props}
      />
    </div>
  );
};

export default Input;
