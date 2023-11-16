import { forwardRef, useRef, useImperativeHandle } from "react"
import { createPortal } from "react-dom"

 const Modal = forwardRef (function Modal({children}, ref) {

    const dialog = useRef()

    useImperativeHandle(ref, () => {
        return{
            open(){
                dialog.current.showModal()
            }
        }
    })

    return createPortal( 
        <dialog ref={dialog} className="modal">
            <div className="p-8 modal-box">
                <h2 className="text-xl font-bold">{children}</h2>
                <p className="py-4 font-light">Please enter valid data</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    )
}
 )

export default Modal