"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearchSubmit }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    const trimmed = searchInput.trim();
    if (trimmed && typeof onSearchSubmit === "function") {
      console.log("Recherche déclenchée :", trimmed);
      onSearchSubmit(trimmed);
      setSearchInput("");
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Rechercher une recette, un ingrédient..."
        className={styles.input}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        className={styles.button}
        onClick={handleSearch}
        aria-label="Rechercher"
      >
        <Image
          src="/images/Search.png"
          alt="Icône de recherche"
          width={20}
          height={20}
          className={styles.icon}
        />
      </button>
    </div>
  );
}
