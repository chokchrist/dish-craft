/* eslint-disable react/prop-types */
import styles from "./IngredientsList.module.scss";

export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  return (
    <section ref={props.getRecipeSectionRef}>
      <h2>Ingredients on hand:</h2>
      <ul className={styles["ingredients-list"]} aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && (
        <div className={styles["recipe-container"]}>
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.getRecipe}>
            {props.loading ? "Loading recipe..." : "Get recipe"}
          </button>
        </div>
      )}
    </section>
  );
}
