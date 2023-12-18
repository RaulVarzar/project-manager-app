import { forwardRef } from "react"

const Input = forwardRef (function Input ({textarea, label, error, ...props}, ref) {
    return(
        <div className="flex flex-col">
                <label className="w-full form-control">
                    <div className="label">
                        <span className="label-text">{label}</span>
                    </div>
                    {textarea &&
                        <textarea ref={ref} className="h-24 textarea textarea-bordered" {...props}></textarea>
                    }
                    {!textarea &&
                        <input ref={ref} type="text" className={"input input-bordered w-full " + (error && ' input-error')} {...props}/>
                    }
                    <div className="label">
                        <span className="text-xs label-text-alt text-error">{error}</span>
                    </div>
                </label>
        </div>
    )
})

export default Input