export default function Button({ children, ...props }) {

    return(
            <button {...props} className="transition duration-150 ease-in rounded-md md:w-full btn btn-outline elevation-4 hover:btn-accent hover:elevation-0">
                 {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>  */}
                            
                {children}
            </button> 
    )
}