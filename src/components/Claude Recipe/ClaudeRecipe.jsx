/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";
import styles from "./ClaudeRecipe.module.scss";

export default function ClaudeRecipe(props) {
  return (
    <section className={styles["suggested-recipe-container"]} aria-live="polite" ref={props.ref}>
      <h2>Dish Craft recommends:</h2>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  );
}
