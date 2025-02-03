import { useState, useEffect, useRef } from "react";
import { driver } from "driver.js";
import { getRecipeFromMistral } from "../../ai";

import IngredientsList from "../Ingredients List/IngredientsList";
import ClaudeRecipe from "../Claude Recipe/ClaudeRecipe";

import "driver.js/dist/driver.css";
import styles from "./Main.module.scss";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");

  const ingredientInputForm = useRef(null);
  const ingredientAddForm = useRef(null);
  const recipeRef = useRef(null);
  const recipeRefSection = useRef(null);

  useEffect(() => {
    if (ingredientInputForm.current && ingredientAddForm.current) {
      const driverObj = driver({
        showProgress: false,
        steps: [
          {
            element: ingredientInputForm.current,
            popover: {
              title: "First Step",
              description: "Write one ingredient at a time.",
            },
          },
          {
            element: ingredientAddForm.current,
            popover: {
              title: "Second Step",
              description: "Press Add ingredient to continue.",
            },
          },
          {
            popover: {
              title: "Third Step",
              description: "Add at least four ingredients.",
            },
          },
        ],
      });

      driverObj.drive();
      if (recipeRefSection.current) {
        driverObj.highlight({
          element: recipeRefSection.current,
          popover: {
            title: "Last Step",
            description: "Click here and wait to see your recipe.",
          },
        });
      }
    }
  }, []);

  useEffect(() => {
    if (recipeRef.current && recipe) {
      recipeRef.current?.scrollIntoView({ behavior: "smooth" });
      setLoading(false);
    }
  }, [recipe]);

  async function getRecipe() {
    try {
      setLoading(true)
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
            ref={ingredientInputForm}
            type="text"
            name="ingredient"
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
          />
          <button type="submit" ref={ingredientAddForm}>
            Add ingredient
          </button>
        </form>
      </section>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          getRecipeSectionRef={recipeRefSection}
          loading={loading}
        />
      )}

      {recipe && <ClaudeRecipe recipe={recipe} ref={recipeRef} />}
    </main>
  );
}
