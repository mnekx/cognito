import Percentage from "./Percentage";
import styles from './results.module.css';

const ResultsComponent = () => { 
    const date = new Date()
    return (<section className={`${styles.root}`}>
    <h2>Test 1</h2>
    <div className={`${styles.content}`}>
        <div className={`${styles.chart}`}>
            <div className={`${styles.wrong}`}></div>
            <div className={`${styles.correct}`}></div>
        </div>
        <Percentage correct={56} wrong={44}/>
        <hgroup>
            <h3>Attempt 1: <span className="text-red-500">Failed</span>(<span className="text-red-900">Exceeded Time limit!</span>)</h3>
            <h3><span className="text-green-500">45 minutes</span> <span className="text-orange-500">(+30 minutes)</span></h3>
            <h4>{date.toDateString()}</h4>
        </hgroup>
    </div>
</section>)}

export default ResultsComponent