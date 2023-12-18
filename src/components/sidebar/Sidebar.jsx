import profilePic from "../../assets/profile.png"

import Button from "../Button.jsx"
import ThemePicker from "./ThemePicker.jsx"

import { Link } from "react-router-dom"

export default function Sidebar({activeProjects, onAddProject, onHomePage, selectedProjectId}) {

    
    function handleSelectProject(id) {
        onSelectProject(id)
    }

    function handleStartAddProject() {
        onAddProject()
    }


    return(
        <>  
            <aside className="z-50 flex flex-row justify-center w-full p-4 px-2 transition duration-300 shadow-xl sm:w-10/12 md:w-fit md:py-16 xl:px-4 hover:shadow-none bg-base-300 sm:rounded-xl md:relative md:flex-col">

                    <div className=" h-fit tooltip tooltip-right" data-tip="Profile">
                        <img src={profilePic} alt="profile pic" className="h-auto mx-auto max-w-[48px]"/>
                    </div>

                    <div className="flex flex-row gap-4 mx-4 md:flex-col md:my-16 ">
                        <div className="tooltip tooltip-right" data-tip="Home">
                            <Link to={``}>
                                <button className="btn btn-ghost lg:btn-lg"><i className="text-xl fa-solid fa-house"></i></button>
                            </Link>
                        </div>

                        <div className="tooltip tooltip-right" data-tip="New project">
                        <Link to={`new`}>
                            <button className="btn btn-ghost lg:btn-lg"><i className="text-xl fa-solid fa-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    
                    <ThemePicker/>
                
            </aside>
        </>
    )
}