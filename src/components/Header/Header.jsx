import LogoIcon from "/public/logo.svg";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header>
      <img src={LogoIcon} alt="Dish Craft Logo" className={styles.icon} />
      <h1 className={styles.title}>Dish Craft</h1>
    </header>
  );
}
