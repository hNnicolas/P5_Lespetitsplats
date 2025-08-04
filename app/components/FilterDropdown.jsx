"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // ou ton icône préférée
import styles from "./FilterDropdown.module.css";

export default function FilterDropdown({ label, tags, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTags = (tags || []).filter((tag) =>
    tag.toLowerCase().includes(search.toLowerCase())
  );

  // Fermer le menu si clic hors de la dropdown
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
        {label} <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <input
            type="text"
            placeholder={`Rechercher un ${label.toLowerCase()}`}
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className={styles.list}>
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <li
                  key={tag}
                  className={styles.item}
                  onClick={() => {
                    console.log("Tag cliqué dans FilterDropdown:", tag);
                    onSelect(tag);
                    setSearch("");
                  }}
                >
                  {tag}
                </li>
              ))
            ) : (
              <li className={styles.noResult}>Aucun résultat</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
