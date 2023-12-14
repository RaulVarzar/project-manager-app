import Button from "./Button"
import { useState } from "react"

export default function Sidebar({activeProjects, onAddProject, onSelectProject, selectedProjectId}) {

    const [menuOpen, setMenuOpen] = useState(false)

    function showMenu() {
        setMenuOpen(!menuOpen)
    }
    
    function clickEvent(id) {
        onSelectProject(id)
        showMenu()
    }

    function clickEvent2() {
        showMenu()
        onAddProject()
    }

    return(<>
        {/* <button className="absolute top-0 left-0 z-30 px-4 py-2 right-full"  onClick={showMenu}><i class="fa-solid fa-bars"></i></button> */}
        <label className="absolute z-30 top-6 right-6 swap swap-rotate md:hidden">
            <input type="checkbox" onClick={showMenu} className="p-2"/>
            <i className={!menuOpen ? "fa-solid fa-bars fa-xl" : "fa-solid fa-xmark fa-xl"}></i>
        </label>
        
        
        <aside className={"absolute z-20 w-full pt-16 md:pt-6 h-screen px-2 py-6 transition duration-300 bg-base-300 md:w-96 md:relative  md:z-20 " + (menuOpen ? " translate-x-[0%]" : "-translate-x-[100%] md:translate-x-0")}>
            <h2 className="text-xl font-bold text-center">PROJECT MANAGER</h2>
            <div className="flex justify-around p-2 pt-8">
                <Button onClick={clickEvent2}>
                    <i className="fa-solid fa-square-plus"></i>  
                    NEW PROJECT 
                </Button>    
            </div>
            
            {activeProjects ?
            <ul className="p-0 py-4 mx-auto mt-4 transition duration-200 ease-out menu md:menu-lg">
                <li className="mx-auto transition duration-300 -translate-x-1 md:translate-x-0 md:mx-0">
                    <h2 className="transition duration-[400ms] ease-in-out md:text-lg text-white menu-title group-hover:text-primary">Active Projects</h2>
                    <ul className="ml-2 border-l-2 border-l-base-300 group">

                    { activeProjects.map( (project) => {
                    let classes = 'block hover:text-white animate-fade-down animate-duration-500 transition duration-150 mb-2 w-fit tooltip-right tooltip-accent tooltip'
                    if (project.id === selectedProjectId){
                        classes += ' text-primary font-bold'
                    }
                    return( 
                        
                        <li key={project.id} className={classes} data-tip={`Due on ${ project.date}`} >
                            <button className="p-2" onClick={() => clickEvent(project.id)} >{project.title}</button>
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
        
        
        </>
    )
}