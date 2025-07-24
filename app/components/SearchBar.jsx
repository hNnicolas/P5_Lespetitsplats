"use client";

import Image from "next/image";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Rechercher une recette, un ingrédient..."
        className={styles.input}
      />
      <button className={styles.button} aria-label="Rechercher">
        <Image
          src="/images/Search.png"
          alt="Icône de recherche"
          width={20} // ajuste selon la maquette
          height={20}
          className={styles.icon}
        />
      </button>
    </div>
  );
}
