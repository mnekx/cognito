import Navbar from "../navbar/NavbarComp"
import Header from "../header/HeaderComp"
import Main from "../main/MainComp";
import styles from './in.module.css';
import { Outlet } from "react-router-dom";

const SignedinHome = () => <div className={styles.Wrapper}><Navbar/>
<Header textInside='SIGNEDIN HOME'/>
<Main> <Outlet/> </Main></div>
export default SignedinHome