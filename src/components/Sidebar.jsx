import Button from "./Button"

export default function Sidebar({activeProjects, onAddProject, onSelectProject}) {
    return(
        <aside className="h-screen px-2 py-16 shadow-lg shadow-content bg-base-300 md:w-96">
            <div className="flex justify-around p-4">
                <Button onClick={onAddProject}>
                    <i className="fa-solid fa-square-plus"></i>  
                    NEW PROJECT 
                </Button>    
            </div>
            
            {activeProjects.length >= 1 ?
            <ul className="max-w-full py-4 mx-4 mt-4 group menu md:menu-lg bg-base-200 rounded-xl">
                <li>
                    <h2 className="transition duration-[400ms] ease-in-out md:text-lg menu-title group-hover:text-accent">Active Projects</h2>
                    <ul>
                    {activeProjects.map( (project) =>
                       <li key={project.id} className="animate-fade-down animate-duration-500"><button onClick={() => onSelectProject(project.id)}>{project.title}</button></li>
                    )}
                    </ul>
                </li>
                </ul>
                :
                <h1 className="mt-4 text-center">No projects</h1>
                }
        </aside>
    )
}