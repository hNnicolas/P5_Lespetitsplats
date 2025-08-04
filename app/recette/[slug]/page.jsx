import recipes from "@/app/data/recipes.json";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import styles from "./RecipePage.module.css";

export default async function RecipePage({ params }) {
  const { slug } = await params; // <-- await ici

  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) {
    notFound();
  }

  // Découper la description en étapes
  const steps = recipe.description
    .split(/(?<=[.!?])\s+(?=[A-ZÉÀ])/)
    .filter((s) => s.trim().length > 0);

  return (
    <>
      <Header minimal={true} />

      <main className={styles.page}>
        {/* Colonne image */}
        <div className={styles.imageContainer}>
          <Image
            src={`/images/${recipe.image}`}
            alt={`Photo de ${recipe.name}`}
            width={600}
            height={600}
            className={styles.image}
          />
        </div>

        {/* Colonne contenu */}
        <div className={styles.content}>
          <h1 className={styles.title}>{recipe.name}</h1>

          <span className={styles.time}>{recipe.time}min</span>

          <div className={styles.section}>
            <h3>Ingrédients</h3>
            <ul>
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>
                  {ing.ingredient}
                  {ing.quantity ? ` : ${ing.quantity} ${ing.unit || ""}` : ""}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h3>Ustensiles nécessaires</h3>
            <ul>
              {recipe.ustensils.map((u, i) => (
                <li key={i}>{u}</li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h3>Appareils nécessaires</h3>
            <p>{recipe.appliance}</p>
          </div>

          <div className={styles.section}>
            <h3>Recette</h3>
            <ol>
              {steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}
