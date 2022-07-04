import styles from './testing.module.css';

import Problem from "./problem/ProblemComp";
import { useState } from "react";
const Testing = () => {
    const [current, setCurrent] = useState(0)
    const problemsData = [
        {id: '1', description: 'qn1', choices: [1, 2, 3, 4], duration: 120, multiple: true},
        {id: '2', description: 'qn2', choices: [1, 2, 3, 4], duration: 120},
        {id: '3', description: 'qn3', choices: [1, 2, 3, 4], duration: 120},
        {id: '4', description: 'qn4', choices: [1, 2, 3, 4], duration: 120},
        {id: '5', description: 'qn5', choices: [1, 2, 3, 4], duration: 120, multiple: true},
        {id: '6', description: 'qn6', choices: [1, 2, 3, 4], duration: 120},
        {id: '7', description: 'qn7', choices: [1, 2, 3, 4], duration: 120},
        {id: '8', description: 'qn8', choices: [1, 2, 3, 4], duration: 120},
        {id: '9', description: 'qn9', choices: [1, 2, 3, 4], duration: 120},
        {id: '10', description: 'qn10', choices: [1, 2, 3, 4], duration: 120, multiple: true},
        {id: '11', description: 'qn11', choices: [1, 2, 3, 4], duration: 120},
        {id: '12', description: 'qn12', choices: [1, 2, 3, 4], duration: 120},
    ]
    const handleNext = () => {
        const newCurrent = current!==(problemsData.length - 1)? current+1: -1;
        console.log(newCurrent);
        setCurrent(newCurrent);
    }
    return (
    <div className={styles.Wrapper}>
        {problemsData.map((problem, index) => { 
            return (index === current && <Problem key={problem.id} data={problem} handleNext={handleNext}/>) 
         }
        )}
    </div>
    )
}

export default Testing