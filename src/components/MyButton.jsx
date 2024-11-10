export default function MyButton({handler, text}){

    return(
     <button onClick={handler}>{text}</button>
    )
}