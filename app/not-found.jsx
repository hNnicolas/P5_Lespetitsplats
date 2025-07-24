// app/not-found.jsx
import styles from "./not-found.module.css";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>

      {/* Logo */}
      <div className={styles.logoWrapper}>
        <Image
          src="/images/logo.svg"
          alt="Logo Les Petits Plats"
          width={180}
          height={40}
          className={styles.logo}
        />
      </div>

      {/* Contenu */}
      <div className={styles.content}>
        <h1 className={styles.title}>404 :(</h1>
        <p className={styles.text}>
          La page que vous demandez est introuvable.
        </p>
      </div>

      <footer className={styles.footer}>
        Copyright © 2025 - Les Petits Plats
      </footer>
    </div>
  );
}
