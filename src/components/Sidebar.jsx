import Button from "./AddNewButton"

export default function Sidebar({activeProjects, onAddProject}) {
    return(
        <aside className="w-1/3 py-16 shadow-lg shadow-content bg-base-300 md:w-96">
            <div className="flex justify-around p-4">
                <Button onClick={onAddProject}>NEW PROJECT</Button>    
            </div>
            
            
            <ul className="max-w-full py-4 mx-4 mt-4 group menu md:menu-lg bg-base-200 rounded-xl">
                <li>
                    {activeProjects.length < 1 ? <p>No projects</p>: <h2 className="transition duration-[400ms] ease-in-out md:text-lg menu-title group-hover:text-accent">Active Projects</h2>}
                    
                    <ul>
                    {activeProjects.map( (project) =>
                       <li key={project.id} className="animate-fade-down animate-duration-500"> <button>{project.title}</button></li>
                    )}
                    </ul>
                </li>
                </ul>
        </aside>
    )
}