import styles from './Header.module.css';

const Header = ({textInside}) => <header className={styles.AppHeader}>
{textInside}
</header>

export default Header