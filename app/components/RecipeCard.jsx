import Link from "next/link";
import Image from "next/image";
import styles from "./RecipeCard.module.css";

export default function RecipeCard({ recipe }) {
  return (
    <Link href={`/recette/${recipe.slug}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={`/images/${recipe.image}`}
            alt={`Photo du plat ${recipe.name}`}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 380px"
          />
          <span
            className={styles.time}
            aria-label={`Temps de préparation : ${recipe.time} minutes`}
          >
            {recipe.time}min
          </span>
        </div>
        <div className={styles.content}>
          <h2>{recipe.name}</h2>
          <div>
            <h3>RECETTE</h3>
            <p>{recipe.description}</p>
          </div>
          <div>
            <h3>INGRÉDIENTS</h3>
            <ul className={styles.ingredients}>
              {recipe.ingredients?.map((ing, i) => (
                <li key={i} className={styles.ingredientItem}>
                  <span className={styles.ingredientName}>
                    {ing.ingredient}
                  </span>
                  {ing.quantity && (
                    <span className={styles.ingredientQuantity}>
                      {ing.quantity} {ing.unit}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}
