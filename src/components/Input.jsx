import { forwardRef } from "react"

const Input = forwardRef (function Input ({textarea, label, ...props}, ref) {
    return(
        <>
            <span className="mb-1 label-text"> {label} </span>
            { textarea ? 
                <textarea ref={ref} className="mb-4 rounded-lg textarea" {...props}></textarea>
             : 
                <input ref={ref} className="w-full max-w-xs mb-4 rounded-lg input" {...props}></input>}
        </>
    )
})

export default Input