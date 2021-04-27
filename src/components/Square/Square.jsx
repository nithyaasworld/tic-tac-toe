import './Square.css';
export default function Square(props) {
    return (
        <button style={{backgroundColor: props.gameState!=='In Progress' ? 'rgb(221, 218, 218, 0.5)' : 'white'}} onClick={(e)=>props.clickHandler(props.index)}>{props.value}</button>
    )
}