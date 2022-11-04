import styles from './testing.module.css';

import Problem from './problem/ProblemComp';
import { useEffect, useState } from 'react';
import ResultsComponent from './results/Results';
import Header from '../header/HeaderComp';

const toHHMMSS = (secs) => {
  let hours = parseInt(secs / 3600);
  let minutes = parseInt((secs - hours * 3600) / 60);
  let seconds = secs - minutes * 60 - hours * 3600;

  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  return hours + ':' + minutes + ':' + seconds;
};

const Testing = () => {
  const [current, setCurrent] = useState(0);
  const [remainingSecs, setRemainingSecs] = useState(15 * 60);
  const [timeString, setTimeString] = useState(toHHMMSS(15 * 60));

  useEffect(() => {
    setTimeString(toHHMMSS(remainingSecs));
  }, [remainingSecs]);

  useEffect(() => {
    const interval = setInterval(() =>
      setRemainingSecs((preSeconds) => {
        return preSeconds-1;
      }),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  const problemsData = [
    {
      id: '1',
      description: 'qn1',
      choices: [1, 2, 3, 4],
      duration: 120,
      multiple: true,
    },
    { id: '2', description: 'qn2', choices: [1, 2, 3, 4], duration: 120 },
    { id: '3', description: 'qn3', choices: [1, 2, 3, 4], duration: 120 },
    { id: '4', description: 'qn4', choices: [1, 2, 3, 4], duration: 120 },
    {
      id: '5',
      description: 'qn5',
      choices: [1, 2, 3, 4],
      duration: 120,
      multiple: true,
    },
    { id: '6', description: 'qn6', choices: [1, 2, 3, 4], duration: 120 },
    { id: '7', description: 'qn7', choices: [1, 2, 3, 4], duration: 120 },
    { id: '8', description: 'qn8', choices: [1, 2, 3, 4], duration: 120 },
    { id: '9', description: 'qn9', choices: [1, 2, 3, 4], duration: 120 },
    {
      id: '10',
      description: 'qn10',
      choices: [1, 2, 3, 4],
      duration: 120,
      multiple: true,
    },
    { id: '11', description: 'qn11', choices: [1, 2, 3, 4], duration: 120 },
    { id: '12', description: 'qn12', choices: [1, 2, 3, 4], duration: 120 },
  ];
  const handleNext = () => {
    const newCurrent = current !== problemsData.length - 1 ? current + 1 : -1;
    console.log(newCurrent);
    setCurrent(newCurrent);
  };

  return (
    <div className={styles.Wrapper}>
      <Header textInside={timeString} />
      {problemsData.map((problem, index) => {
        return (
          index === current && (
            <Problem key={problem.id} data={problem} handleNext={handleNext} />
          )
        );
      })}
      {current === -1 && <ResultsComponent />}
    </div>
  );
};

export default Testing;
