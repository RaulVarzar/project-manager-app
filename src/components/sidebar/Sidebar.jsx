import { useState } from "react"

import profilePic from "../../assets/profile.png"

import Button from "../Button.jsx"
import ActiveProjectsList from "./ActiveProjectsList.jsx"
import ThemePicker from "./ThemePicker.jsx"

export default function Sidebar({activeProjects, onAddProject, onHomePage, selectedProjectId}) {

    const [menuOpen, setMenuOpen] = useState(false)
    
    function handleSelectProject(id) {
        onSelectProject(id)
        setMenuOpen(false)
    }

    function handleStartAddProject() {
        setMenuOpen(false)
        onAddProject()
    }


    return(
        <>
            <label className="absolute z-30 top-6 right-6 swap swap-rotate md:hidden">
                <input type="checkbox" onClick={() => setMenuOpen(!menuOpen)} className="p-2"/>
                <i className={!menuOpen ? "fa-solid fa-bars fa-xl" : "fa-solid fa-xmark fa-xl"}></i>
            </label>
            
            <aside className={"z-20 rounded-xl pt-16 md:pt-6 px-2 transition place-content-center duration-300 w-fit md:relative flex flex-col items-stretch md:z-20 " + (menuOpen ? " translate-x-[0%]" : "-translate-x-[100%] md:translate-x-0")}>
            <div className="flex flex-col w-fit"> 
                    
                    <div className="p-2">
                        <img src={profilePic} alt="profile pic" className="p-2"/>
                    </div> 
                    <div className="grid gap-4">
                        <button className="btn btn-ghost lg:btn-lg"><i className="fa-solid fa-house" onClick={onHomePage} ></i></button>
                        <button className="btn btn-ghost lg:btn-lg"><i className="fa-solid fa-plus" onClick={handleStartAddProject}></i></button>
                        <ThemePicker/>
                    </div>
                    {/* {activeProjects.length > 0 ?
                        <ActiveProjectsList 
                            activeProjects={activeProjects} 
                            selectedProjectId={selectedProjectId} 
                            onSelectProject={handleSelectProject}
                        />
                        :
                        <h1 className="mt-10 italic tracking-wider text-center opacity-60">NO ACTIVE PROJECTS</h1>
                    } */}
                </div>
               
            </aside>
        </>
    )
}