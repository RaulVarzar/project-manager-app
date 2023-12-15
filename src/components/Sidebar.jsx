import { FadeIn, FromLeft } from "./Animations";
import Button from "./Button"
import { useState, useEffect } from "react"
import {motion} from 'framer-motion'

export default function Sidebar({activeProjects, onAddProject, onSelectProject, selectedProjectId}) {

    const [theme, setTheme] = useState(
        JSON.parse(localStorage.getItem('storedTheme'))
      );
    
      useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
        localStorage.setItem('storedTheme', JSON.stringify(theme));
      }, [theme]);
      
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
        <label className="absolute z-30 top-6 right-6 swap swap-rotate md:hidden">
            <input type="checkbox" onClick={showMenu} className="p-2"/>
            <i className={!menuOpen ? "fa-solid fa-bars fa-xl" : "fa-solid fa-xmark fa-xl"}></i>
        </label>
        
        <aside className={"absolute z-20 w-full pt-16 md:pt-6 h-screen px-4 py-6 transition place-content-between duration-300 bg-neutral md:w-[24rem] lg:w-[28rem] md:relative flex flex-col items-stretch md:z-20 " + (menuOpen ? " translate-x-[0%]" : "-translate-x-[100%] md:translate-x-0")}>
           <div> <h2 className="text-xl font-bold text-center">PROJECT MANAGER</h2>
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
                    <motion.ul layout  className="ml-2 overflow-hidden border-l-2 border-l-base-300 group">

                    { activeProjects.map( (project) => {
                    let classes = 'w-full hover:text-white mb-2 w-fit tooltip-right tooltip-accent tooltip'
                    if (project.id === selectedProjectId){
                        classes += ' text-primary font-bold'
                    }
                    return( 
                        <FromLeft key={project.id} duration={0.3} delay={0.3}>
                            <motion.li layout key={project.id} className={classes} data-tip={`Due on ${ project.date}`} >
                                <p className="p-2" onClick={() => clickEvent(project.id)} >{project.title}</p>
                            </motion.li>
                        </FromLeft>
                        )
                   })}
                    </motion.ul>
                </li>
                </ul>
                :
                <h1 className="mt-4 text-center">No projects</h1>
                }
                </div>
                <div className="flex flex-col items-center">
                
                <div className="mb-2 rounded-lg join join-horizontal">
                    <input type="radio" name="theme-buttons" className="btn theme-controller join-item" onChange={() => setTheme('dark')} aria-label="Dark" checked={theme==="dark"}/>
                    <input type="radio" name="theme-buttons" className="btn theme-controller join-item" onChange={() => setTheme('coffee')} aria-label="Elegant" checked={theme==="coffee"}/>
                    <input type="radio" name="theme-buttons" className="btn theme-controller join-item" onChange={() => setTheme('aqua')} aria-label="Aqua" checked={theme==="aqua"}/>
                </div><p className="text-lg font-bold opacity-60">THEME</p>
                </div>
              </aside>
        </>
    )
}