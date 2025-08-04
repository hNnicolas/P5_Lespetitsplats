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
  const [searchTerm, setSearchTerm] = useState(""); // recherche principale
  const [searchInIngredients, setSearchInIngredients] = useState("");
  const [searchInAppareils, setSearchInAppareils] = useState("");
  const [searchInUstensiles, setSearchInUstensiles] = useState("");

  // Fonction appelée par la barre de recherche principale
  const handleSearchSubmit = (term) => {
    const lowerTerm = term.toLowerCase();

    if (!selectedTags.includes(lowerTerm)) {
      setSelectedTags((prev) => [...prev, lowerTerm]);
    }
    setSearchTerm(lowerTerm);
  };

  // Ajouter un tag sélectionné
  const handleSelectTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  // Supprimer un tag sélectionné
  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  // Filtrer les recettes en fonction de la recherche principale et des tags sélectionnés
  const filteredRecipes = useMemo(() => {
    let filtered = recipesData;

    // Recherche libre dans titre, description, ingrédients
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((recipe) => {
        const title = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();
        const ingredientsText = recipe.ingredients
          .map((i) => i.ingredient.toLowerCase())
          .join(" ");

        return (
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          ingredientsText.includes(searchTerm)
        );
      });
    }

    // Filtrage par tags sélectionnés (ingrédients, appareils, ustensiles)
    if (selectedTags.length > 0) {
      filtered = filtered.filter((recipe) => {
        const recipeTags = [
          ...recipe.ingredients.map((i) => i.ingredient.toLowerCase()),
          recipe.appliance.toLowerCase(),
          ...recipe.ustensils.map((u) => u.toLowerCase()),
        ];
        return selectedTags.every((tag) =>
          recipeTags.some((recipeTag) => recipeTag.includes(tag))
        );
      });
    }

    return filtered;
  }, [searchTerm, selectedTags]);

  // Calculer les tags uniques des recettes filtrées pour chaque catégorie
  const ingredients = useMemo(() => {
    const all = filteredRecipes.flatMap((r) =>
      r.ingredients.map((i) => i.ingredient.toLowerCase())
    );
    return [...new Set(all)];
  }, [filteredRecipes]);

  const appareils = useMemo(() => {
    const all = filteredRecipes.map((r) => r.appliance.toLowerCase());
    return [...new Set(all)];
  }, [filteredRecipes]);

  const ustensiles = useMemo(() => {
    const all = filteredRecipes.flatMap((r) =>
      r.ustensils.map((u) => u.toLowerCase())
    );
    return [...new Set(all)];
  }, [filteredRecipes]);

  // Fonction pour filtrer les tags visibles dans chaque dropdown selon la recherche partielle dans ce dropdown
  const filterDropdownTags = (tags, searchInDropdown) =>
    tags
      .filter((tag) => !selectedTags.includes(tag))
      .filter((tag) => tag.includes(searchInDropdown.toLowerCase()));

  return (
    <main className={styles.main}>
      <Header onSearchSubmit={handleSearchSubmit} />

      <div className={styles.filters}>
        <FilterDropdown
          label="Ingrédients"
          tags={filterDropdownTags(ingredients, searchInIngredients)}
          searchValue={searchInIngredients}
          onSearchChange={setSearchInIngredients}
          onSelect={handleSelectTag}
        />
        <FilterDropdown
          label="Appareils"
          tags={filterDropdownTags(appareils, searchInAppareils)}
          searchValue={searchInAppareils}
          onSearchChange={setSearchInAppareils}
          onSelect={handleSelectTag}
        />
        <FilterDropdown
          label="Ustensiles"
          tags={filterDropdownTags(ustensiles, searchInUstensiles)}
          searchValue={searchInUstensiles}
          onSearchChange={setSearchInUstensiles}
          onSelect={handleSelectTag}
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
              onClick={() => handleRemoveTag(tag)}
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
