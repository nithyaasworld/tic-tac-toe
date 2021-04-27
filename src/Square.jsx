import './Square.css';
export default function Square(props) {
    return (
        <button onClick={(e)=>props.clickHandler(props.index)}>{props.value}</button>
    )
}