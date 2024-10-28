import './style.scss';
import {useRef} from "react"
function TextArea({values,onChange}){
    const textAreaRef = useRef();

    const resizeTextArea = (event)=>{
        textAreaRef.current.style.height = "24px";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 12 + "px"
    }
    return(
        <div>
            <textarea value={values} onChange={onChange} ref={textAreaRef} onInput={resizeTextArea} placeholder='Type something...' className='text-area'></textarea>
        </div>
    )
}

export default TextArea;