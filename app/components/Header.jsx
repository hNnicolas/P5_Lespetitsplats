'use client';

import Image from 'next/image';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
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

        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            DÉCOUVREZ NOS RECETTES<br />
            <span>DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES</span>
          </h1>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
