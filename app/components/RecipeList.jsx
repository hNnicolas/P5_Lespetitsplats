import RecipeCard from "./RecipeCard";
import recipes from "../data/recipes.json";
import styles from "./RecipeList.module.css";

const RecipeList = () => {
  return (
    <section className={styles.recipeList}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </section>
  );
};

export default RecipeList;
