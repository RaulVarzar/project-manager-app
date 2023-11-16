import Button from "./Button"

export default function Sidebar({activeProjects, onAddProject, onSelectProject, selectedProject}) {
    return(
        <aside className="h-screen px-2 py-16 bg-base-300 md:w-96">
            <div className="flex justify-around p-4">
                <Button onClick={onAddProject}>
                    <i className="fa-solid fa-square-plus"></i>  
                    NEW PROJECT 
                </Button>    
            </div>
            
            {activeProjects.length >= 1 ?
            <ul className="max-w-full py-4 mx-4 mt-4 transition duration-300 ease-in-out menu group md:menu-lg bg-base-200 rounded-xl elevation-4 hover:elevation-1">
                <li>
                    <h2 className="transition duration-[400ms] ease-in-out md:text-lg menu-title">Active Projects</h2>
                    <ul className="ml-2 border-l-2 border-l-base-300 group">

                    { activeProjects.map( (project) => {
                    let classes = 'animate-fade-down animate-duration-500 transition duration-150'
                    if (project.id === selectedProject){
                        classes += ' text-accent font-bold'
                    }
                    return( 
                        <li key={project.id} className={classes}>
                            <button onClick={() => onSelectProject(project.id)} >{project.title}</button>
                        </li>
                        )
                   })}
                        
                    
                    </ul>
                </li>
                </ul>
                :
                <h1 className="mt-4 text-center">No projects</h1>
                }
        </aside>
    )
}