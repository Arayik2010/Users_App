import Login from "@/components/Molecules/login";
import styles from "@/styles/mainContainer.module.scss";

export default function Home() {
  return (
    <main className="flex min-h-screen ">
      <div className={styles.container}>
        <Login />
      </div>
    </main>
  );
}
