const Percentage = ({correct, wrong}) => {
    const ratio = correct*10**2/(correct+wrong)/10**2;
    const percentage = ratio * 100;
    return <p><strong className="text-5xl font-bold">{percentage.toFixed()}%</strong> {correct}/{correct+wrong}</p>
}

export default Percentage;