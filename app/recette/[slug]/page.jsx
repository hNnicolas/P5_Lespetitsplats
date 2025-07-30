import recipes from "@/app/data/recipes.json";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function RecipePage({ params }) {
  const recipe = recipes.find((r) => r.slug === params.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <>
      {/* Header avec le logo uniquement */}
      <Header minimal={true} />

      <main style={{ padding: "1rem", maxWidth: 800, margin: "auto" }}>
        <h1>{recipe.name}</h1>

        <Image
          src={`/images/${recipe.image}`}
          alt={`Photo de ${recipe.name}`}
          width={600}
          height={400}
          style={{ borderRadius: 8 }}
        />

        <p>{recipe.description}</p>

        <h2>Ingrédients :</h2>
        <ul>
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>
              {ing.ingredient}
              {ing.quantity ? ` : ${ing.quantity} ${ing.unit || ""}` : ""}
            </li>
          ))}
        </ul>

        <h2>Appareil :</h2>
        <p>{recipe.appliance}</p>

        <h2>Ustensiles :</h2>
        <ul>
          {recipe.ustensils.map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ul>
      </main>

      {/* Footer inchangé */}
      <Footer />
    </>
  );
}

// Génère les pages statiques pour chaque recette
export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}
