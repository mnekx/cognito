import styles from './problem.module.css';
import utilityStyles from '../../../utility.module.css';
import {FaArrowCircleRight} from 'react-icons/fa';

const Problem = ({data, handleNext}) => {
return (
    <section className={`${styles.Wrapper} ${utilityStyles.DFlex}`}>
        <h2 className={styles.Description}>{data.description}</h2 >
        <div className={`${styles.Choices} ${utilityStyles.DFlex}`}>
            {data.multiple?<h2>Select all that are correct!</h2>: <h2>Select one!</h2>}
            {data.choices.map(choice => {
                return (
                    <label className={`${styles.LabelControl} ${utilityStyles.DBlock}`}>
                        <input type={data.multiple?'checkbox': 'radio'} value={choice} name={data.id}/>
                        {choice}
                    </label>
                )
            })}
            <FaArrowCircleRight size='2em' className={styles.Next} onClick={()=>handleNext()}/>
        </div>
    </section>
)}

export default Problem;