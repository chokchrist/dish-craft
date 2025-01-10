import { useState, useEffect, useRef } from "react";
import { getRecipeFromMistral } from "../../ai";

import IngredientsList from "../Ingredients List/IngredientsList";
import ClaudeRecipe from "../Claude Recipe/ClaudeRecipe";

import styles from "./Main.module.scss";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");

  const recipeRef = useRef(null);

  useEffect(() => {
    if (recipeRef.current && recipe) {
      recipeRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  async function getRecipe() {
    try {
      const recipeMarkdown = await getRecipeFromMistral(ingredients);
      setRecipe(recipeMarkdown);
    } catch (err) {
      console.error(err.message);
    }
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");

    if (!newIngredient == "") {
      setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
    }
  }

  return (
    <main>
      <section className={styles["ingredient-section"]}>
        <form className={styles["ingredient-form"]} action={addIngredient}>
          <input
            type="text"
            name="ingredient"
            placeholder="Add one ingredient at a time, e.g. oregano."
            aria-label="Add ingredient"
          />
          <button type="submit">Add ingredient</button>
        </form>
      </section>

      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {recipe && <ClaudeRecipe recipe={recipe} ref={recipeRef} />}
    </main>
  );
}
