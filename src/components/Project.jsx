import { useState, useRef } from "react"
import Modal from "./Modal"
import {motion} from 'framer-motion'
import { FadeIn, JumpIn } from "./Animations"

export default function Project( {project, deleteProject, addTask, onComplete}) {

    const [input, setInput] = useState('')
    const modal = useRef()

    function handleChange(){
        setInput(event.target.value)
    }
    
    function handleAddTask(e){
        if (e.key === 'Enter') { 
            if (input.trim().length !== 0)  {
                addTask(input)
                setInput('')
            }
        }
    }
    
    function doubleCheck(){
        modal.current.open()
    }

    const activeTasks = project.tasks.filter((task) => {return task.completed === false})
    const completedTasks = project.tasks.filter((task) => {return task.completed === true})
    
    return (
        <>
        <Modal ref={modal} errorText={"This can't be undone"} action={() =>deleteProject()}>Delete  project?</Modal>
        <JumpIn duration={0.3} delay={0.1}>
          <motion.div layout className="flex flex-col">
            <motion.div  className="w-11/12 mx-auto ease-out rounded-lg shadow-xl xl:w-10/12 bg-info-content">
            <div className="p-0">
                <div className="p-0 text-center justify-items-end lg:flex">
                    <div className="flex px-0 py-4 min-w-[30%]  lg:px-10  lg:text-right ">
                        <div className="w-full m-auto">
                            <h2 className="text-lg font-bold leading-none tracking-widest text-gray-100 uppercase md:text-3xl">{project.title}</h2>
                            <p className="text-xs text-gray-400 md:text-sm">Due on: {project.date}</p>
                            <div className="m-0 lg:divider"></div>
                            <p className="text-sm italic tracking-wider text-gray-300 md:text-lg capitalize-first">{project.description}</p>
                        </div>
                    </div>

                    <div className="justify-center w-full p-4 pb-4 rounded-t-full lg:p-10">  
                        <div className="flex flex-col justify-between md:flex-row">
                            <h2 className="mt-1 text-2xl font-bold text-gray-200">TASKS</h2>
                            <input 
                                    autoFocus
                                    type="text" 
                                    onKeyDown={handleAddTask} 
                                    value={input} 
                                    onChange={handleChange} 
                                    placeholder="Add new task" 
                                    className="my-2 text-center rounded-lg outline-none md:my-0 md:w-7/12 focus:outline-none bg-base-100 input" 
                                />
                        </div>
                        <div className="divider">Active</div>
                        
                        {activeTasks.length < 1 ?<p className="italic opacity-50">No active tasks.</p>:
                            <div className="flex flex-wrap justify-center gap-2 py-4 xl:gap-4 ">   
                            {activeTasks.map((task, i) =>  
                                    <JumpIn delay={(i+2)*0.15} duration={0.3}>
                                        <div key={i} className="flex-auto my-1 transition duration-200 ease-out grow animate-duration-200 animate-fade-right join elevation-6 hover:elevation-1">
                                            <span className="p-2 text-sm font-semibold text-center rounded-lg shadow-inner lg:px-6 lg:py-3 join-item bg-base-200 grow text-neutral-content ">
                                            {task.task} 
                                            </span>
                                            <button 
                                                onClick={() => onComplete(task.task, project.id)}
                                                className="relative h-auto px-4 border-none bg-opacity-40 btn btn-accent join-item">
                                                <i className="fa fa-check"></i>
                                            </button>
                                        </div>
                                    </JumpIn>
                            )}
                            </div>
                        }

                        <div className="divider ">Completed</div>

                        {completedTasks.length < 1 ? <p className="italic opacity-50">There are no finished tasks yet.</p>:
                            <div className="flex flex-wrap justify-center gap-2 p-0 md:gap-3 xl:gap-4">
                                {completedTasks.map((task,i) => 
                                <JumpIn delay={(i+2)*0.15} duration={0.5}>
                                    <div key={task.id} className="tooltip" data-tip="Completed">
                                        <div  className="transition duration-200 ease-out animate-duration-200 animate-fade-down join elevation-3">
                                            <span className="px-6 py-3 text-sm font-semibold text-center bg-opacity-50 rounded-lg shadow-inner bg-primary join-item grow text-stone-200 ">
                                            {task.task}
                                            </span>
                                        </div>
                                    </div>
                                </JumpIn>
                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
            
        </motion.div>
        <button onClick={doubleCheck} className="mx-auto mt-4 rounded-md hover:text-red-400 text-stone-400 btn-md btn btn-ghost">
            <i className="fa fa-trash-can fa-xl"></i>
            DELETE PROJECT
        </button>
        </motion.div>

        
        </JumpIn>
    </>
    )
}