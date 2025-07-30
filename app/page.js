"use client";

import { useState, useMemo } from "react";
import Header from "./components/Header";
import FilterDropdown from "./components/FilterDropdown";
import RecipeCard from "./components/RecipeCard";
import Footer from "./components/Footer";
import recipesData from "./data/recipes.json";

import styles from "./page.module.css";

export default function HomePage() {
  const [selectedTags, setSelectedTags] = useState([]);

  // Tags uniques
  const ingredients = useMemo(() => {
    const all = recipesData.flatMap((r) =>
      r.ingredients.map((i) => i.ingredient.toLowerCase())
    );
    return [...new Set(all)];
  }, []);

  const appareils = useMemo(() => {
    const all = recipesData.map((r) => r.appliance.toLowerCase());
    return [...new Set(all)];
  }, []);

  const ustensiles = useMemo(() => {
    const all = recipesData.flatMap((r) =>
      r.ustensils.map((u) => u.toLowerCase())
    );
    return [...new Set(all)];
  }, []);

  // Filtrer les recettes selon les tags sélectionnés avec inclusions partielles
  const filteredRecipes = useMemo(() => {
    if (selectedTags.length === 0) return recipesData;

    return recipesData.filter((recipe) => {
      const recipeTags = [
        ...recipe.ingredients.map((i) => i.ingredient.toLowerCase()),
        recipe.appliance.toLowerCase(),
        ...recipe.ustensils.map((u) => u.toLowerCase()),
      ];
      return selectedTags.every((tag) =>
        recipeTags.some((recipeTag) => recipeTag.includes(tag))
      );
    });
  }, [selectedTags]);

  // Ajouter un tag s’il n’est pas déjà sélectionné
  const handleSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  // Supprimer un tag
  const handleRemove = (tagToRemove) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  // Tags disponibles (non sélectionnés)
  const getAvailableTags = (list) =>
    list.filter((tag) => !selectedTags.includes(tag));

  return (
    <main className={styles.main}>
      <Header onSearchSubmit={handleSelect} />

      <div className={styles.filters}>
        <FilterDropdown
          label="Ingrédients"
          tags={getAvailableTags(ingredients)}
          onSelect={handleSelect}
        />
        <FilterDropdown
          label="Appareils"
          tags={getAvailableTags(appareils)}
          onSelect={handleSelect}
        />
        <FilterDropdown
          label="Ustensiles"
          tags={getAvailableTags(ustensiles)}
          onSelect={handleSelect}
        />
        <span className={styles.recipeCount}>
          {filteredRecipes.length} recette
          {filteredRecipes.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Tags sélectionnés */}
      <div className={styles.selectedTags}>
        {selectedTags.map((tag) => (
          <span key={tag} className={styles.selectedTag}>
            {tag}
            <button
              onClick={() => handleRemove(tag)}
              aria-label={`Supprimer ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      {/* Liste des recettes */}
      <div className={styles.grid}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <Footer />
    </main>
  );
}
