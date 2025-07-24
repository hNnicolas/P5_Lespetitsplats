import recipes from "@/app/data/recipes.json";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function RecipePage({ params }) {
  const recipe = recipes.find((r) => r.slug === params.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <main>
      <h1>{recipe.name}</h1>
      <Image
        src={`/images/${recipe.image}`}
        alt={`Photo de ${recipe.name}`}
        width={600}
        height={400}
      />
      <p>{recipe.description}</p>
    </main>
  );
}

// ✅ Pour générer les pages statiques à la compilation
export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}
