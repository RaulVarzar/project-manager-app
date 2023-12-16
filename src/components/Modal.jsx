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

    function handleAction(){
        action()
        dialog.current.close()
    }

    return createPortal( 
        <dialog ref={dialog} className="text-center modal">
            <div className="p-8 modal-box">
                <h2 className="text-2xl font-bold">{children}</h2>
                <p className="px-4 py-2 mx-auto my-4 font-semibold bg-opacity-80 text-base-300 bg-warning w-fit rounded-xl">{errorText}</p>
                <button className="mr-4 btn btn-outline elevation-3 hover:scale-95" onClick={closeModal}>CLOSE</button>
                {action && <button className="transition duration-300 btn btn-error elevation-4 hover:elevation-0 hover:scale-95" onClick={handleAction}>DELETE</button>}
                
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