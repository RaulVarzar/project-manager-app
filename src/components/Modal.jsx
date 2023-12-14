import { forwardRef, useRef, useImperativeHandle } from "react"
import { createPortal } from "react-dom"

 const Modal = forwardRef (function Modal({children, errorText, action}, ref) {

    const dialog = useRef()

    useImperativeHandle(ref, () => {
        return{
            open(){
                dialog.current.showModal()
            }
        }
    }) 

    function closeModal(){
        dialog.current.close()
    }

    return createPortal( 
        <dialog ref={dialog} className="text-center modal">
            <div className="p-8 modal-box">
                <h2 className="text-xl font-bold">{children}</h2>
                <p className="py-4 font-light">{errorText}</p>
                <button className="mr-4 btn btn-outline elevation-3 hover:scale-95" onClick={closeModal}>CLOSE</button>
                {action && <button className="transition duration-300 btn btn-error elevation-4 hover:elevation-0 hover:scale-95" onClick={action}>DELETE PROJECT</button>}
                
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