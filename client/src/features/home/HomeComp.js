import { Outlet } from "react-router-dom";
import styles from './home.module.css';

const Home = ()=> {
 return <div className={styles.Wrapper}>
     <Outlet/>
      <footer>this is the footer</footer>
 </div>
}

export default Home