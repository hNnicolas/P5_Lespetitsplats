"use client";

import Image from "next/image";
import SearchBar from "./SearchBar";
import styles from "./Header.module.css";
import clsx from "clsx";

export default function Header({ onSearchSubmit, minimal = false }) {
  return (
    <header className={clsx(styles.header, minimal && styles.minimal)}>
      <div className={styles.overlay}>
        <div className={styles.topBar}>
          <Image
            src="/images/logo.svg"
            alt="Logo Les Petits Plats"
            width={200}
            height={40}
            className={styles.logo}
          />
        </div>

        {!minimal && (
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              DÉCOUVREZ NOS RECETTES
              <br />
              <span>DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES</span>
            </h1>
            <SearchBar onSearchSubmit={onSearchSubmit} />
          </div>
        )}
      </div>
    </header>
  );
}
