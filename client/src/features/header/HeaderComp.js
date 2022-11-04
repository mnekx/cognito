import styles from './Header.module.css';

const Header = ({textInside}) => <header className={styles.AppHeader}>
<h1 className="text-3xl font-bold underline">{textInside}</h1>
</header>

export default Header