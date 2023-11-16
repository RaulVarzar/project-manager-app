export default function Project( {project, deleteProject}) {

    const formattedDate = new Date(project.date).toLocaleDateString('en-GB', {
        year: 'numeric', month: 'short', day:'numeric'
    })

    return(
        <>
          <div className="mx-2 rounded-lg elevation-8 md:mx-10 lg:mx-12 xl:mx-36 bg-neutral animate-fade-up animate-duration-100">
            <div className="p-0">
                <div className="p-0 text-center lg:flex">
                    <div className="flex content-center self-stretch px-2 py-4 rounded-t-lg lg:rounded-r-none lg:rounded-l-lg lg:px-10 bg-base-100 lg:text-right min-w-fit">
                        <div className="m-auto ">
                            <h2 className="text-3xl font-bold leading-none tracking-wide text-gray-100 uppercase">{project.title}</h2>
                            <p className="text-xs leading-none text-gray-500">Due on: {project.date}</p>
                            <div className="m-0 divider"></div>
                            <p className="text-lg italic tracking-widest text-gray-300">{project.description}</p>
                        </div>

                    </div>
                    <div className="justify-center p-10 pb-4">  
                        <h2 className="mx-auto text-2xl font-bold text-center text-gray-200">TASKS:</h2>
                        <div className="flex flex-wrap justify-center gap-2 p-1 md:p-4">
                            <input type="text" placeholder="Add new task" className="w-full max-w-xs rounded-lg outline-none cursor-pointer input" />
                            {project.tasks.map((task) => 
                                <span class="bg-info-content text-center grow rounded-lg px-6 py-3 text-sm font-semibold text-neutral-content">{task}</span>
                            )}
                        </div>
                        
                        <button onClick={deleteProject} className="mx-auto mt-4 text-gray-300 btn-sm btn btn-ghost hover:text-red-500">
                            <i className="fa fa-trash-can"> </i>
                            Delete project
                        </button>
                    </div>
                    
                    
                </div>
                
                
            </div>
        </div>
            
        </>
    )
}