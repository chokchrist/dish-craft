import { useState } from "react";
import { getRecipeFromMistral } from "../../ai";

import IngredientsList from "../Ingredients List/IngredientsList";

import styles from "./Main.module.scss";
import ClaudeRecipe from "../Claude Recipe/ClaudeRecipe";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState();
  
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
      <form className={styles["ingredient-form"]} action={addIngredient}>
        <input
          type="text"
          name="ingredient"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
        />
        <button type="submit">Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe}/>
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
