export default function Project() {
    return(
        <>
            <div className="w-7/12 mx-auto my-auto shadow-xl rounded-xl card bg-base-300 animate-fade-up animate-duration-200">
                <div className="card-body">

                <div className="flex flex-col">
                    <div className="grid card place-items-center">
                    {/* <button className="btn btn-outline btn-secondary">Delete Project</button> */}

                        <h1 className="mt-4 text-3xl card-title">LEARNING REACT</h1>
                        <p className="text-sm text-accent">Dec 29, 2024</p>
                        <h2 className="mt-6 text-2xl">TASKS:</h2>

                        <ul className="flex flex-wrap justify-center gap-4 my-4 lg:text-lg">
                            <li className="flex px-10 py-3 space-x-3 rounded-full bg-base-100">
                                <span className="text-base-content">List Item 1 List  Item 1 List Item 1 List Item 1</span>
                            </li>

                            <li className="flex px-10 py-3 space-x-3 rounded-full bg-base-100">
                                <span className="text-base-content">List Item 2 List </span>
                            </li>

                            <li className="flex px-10 py-3 space-x-3 rounded-full bg-base-100">
                                <span className="text-base-content">List Item 3  1 List Item 1 List It</span>
                            </li>
                            <li className="flex px-10 py-3 space-x-3 rounded-full bg-base-100">
                                <span className="text-base-content">List Item 3  1 List Item 1 List It</span>
                            </li>
                        </ul>
                        
                    </div> 

                    <div className="flex justify-center mt-2 rounded-xl join">
                         <input type="text" placeholder="Input new task" className="w-full max-w-xs join-item input input-bordered" />
                        <button className="px-6 join-item btn btn-accent">ADD</button>
                    </div>

                    <div className="divider"></div> 
                </div>

                <button className="self-center max-w-sm btn btn-sm btn-outline btn-error"> Delete project</button>

                </div>
            </div>
        </>
    )
}