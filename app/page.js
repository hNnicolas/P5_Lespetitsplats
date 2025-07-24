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
      r.ingredients.map((i) => i.ingredient)
    );
    return [...new Set(all.map((i) => i.toLowerCase()))];
  }, []);

  const appareils = useMemo(() => {
    const all = recipesData.map((r) => r.appliance);
    return [...new Set(all.map((a) => a.toLowerCase()))];
  }, []);

  const ustensiles = useMemo(() => {
    const all = recipesData.flatMap((r) => r.ustensils);
    return [...new Set(all.map((u) => u.toLowerCase()))];
  }, []);

  // Filtrer les recettes selon les tags sélectionnés
  const filteredRecipes = useMemo(() => {
    if (selectedTags.length === 0) return recipesData;

    return recipesData.filter((recipe) => {
      const recipeTags = [
        ...recipe.ingredients.map((i) => i.ingredient.toLowerCase()),
        recipe.appliance.toLowerCase(),
        ...recipe.ustensils.map((u) => u.toLowerCase()),
      ];
      return selectedTags.every((tag) => recipeTags.includes(tag));
    });
  }, [selectedTags]);

  // Gestion du clic sur tag
  const handleSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const handleRemove = (tagToRemove) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  // Tags disponibles = ceux non sélectionnés
  const getAvailableTags = (list) =>
    list.filter((tag) => !selectedTags.includes(tag));

  return (
    <main className={styles.main}>
      <Header />

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
          {filteredRecipes.length} recettes
        </span>
      </div>

      {/* Tags sélectionnés visibles */}
      <div className={styles.selectedTags}>
        {selectedTags.map((tag) => (
          <span key={tag} className={styles.selectedTag}>
            {tag}
            <button onClick={() => handleRemove(tag)}>&times;</button>
          </span>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredRecipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>

      <Footer />
    </main>
  );
}
