import React  from "react";
import styles from "@/styles/users.module.scss";
import BackFileCollection from "@/components/Molecules/BackFileColection";
import UpdateUserDataForm from "@/components/Organism/UpdateUser/updateUserData";

interface UserProps {
  params: any;
}

export default async function UpdateUser({ params: { id } }: UserProps) {
  const requestItem = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/user/${id}`, {
    cache: 'no-store',
  });
  const responseItem = await requestItem.json();
 
  return (
    <div className={styles.container}>
      <BackFileCollection title="Custom User Data" href="/users" />
      <div className={styles.container_inputs}>
        <UpdateUserDataForm responseItem={responseItem} id={id} />
      </div>
    </div>
  );
}
