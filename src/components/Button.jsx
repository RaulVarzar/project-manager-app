export default function Button({ children, ...props }) {

    return(
            <button {...props} className="transition duration-150 ease-in rounded-md md:w-full btn btn-outline elevation-4 hover:elevaiton-0 hover:scale-95 btn-primary hover:elevation-0">
                 {children}
            </button> 
    )
}