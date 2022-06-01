import Header from "../header/HeaderComp"
import Main from "../main/MainComp"
import Navbar from "../navbar/NavbarComp"
import styles from './out.module.css';

const SignedoutHome = () => <div className={styles.Wrapper}><Navbar/>
<Header textInside='SIGNEDOUT HOME'/>
<Main/></div>
export default SignedoutHome