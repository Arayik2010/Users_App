import React, { forwardRef, useState } from "react";
import Input from "./Input";
import styles from "@/styles/mainContainer.module.scss";

const InputGroup = ({ register, id, type, label, name, placeholder }: any) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {focused ? <label className={styles.control_label}>{label}</label> : ""}

      <Input
        register={register}
        id={id}
        type={type}
        label={label}
        name={name}
        placeholder={focused ? "" : label}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};
export default forwardRef(InputGroup);
