import Navbar from "../navbar/NavbarComp"
import Main from "../main/MainComp";
import styles from './in.module.css';
import { Outlet } from "react-router-dom";

const SignedinHome = () => <div className={styles.Wrapper}><Navbar/>

<Main style={{height: '90vh'}}> <Outlet/> </Main></div>
export default SignedinHome