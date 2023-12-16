import { useState, useRef } from "react"
import Modal from "./Modal"
import {AnimatePresence, LayoutGroup, motion} from 'framer-motion'
import { FadeIn, JumpIn, FromLeft } from "./Animations"
import ActiveTask from "./ActiveTask"

export default function Project( {project, deleteProject, addTask, onComplete, handleUpdate, handleDeleteTask}) {
    const [input, setInput] = useState('')
    const [expand, setExpand] = useState()

    const modal = useRef()
   
    function handleExpand(task) {
        if (expand===task) {
            setExpand()
        } else {
            setExpand(task)
        }
    }

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
    // const activeTasks = project.tasks.filter((task) => {return task.completed === false})
    const completedTasks = project.tasks.filter((task) => {return task.completed === true})
    
    return (
        <>
        <Modal ref={modal} errorText={"This action can't be undone"} action={() =>deleteProject()}>Delete  project?</Modal>
        <JumpIn duration={0.3} delay={0.1}>
          <motion.div layout className="flex flex-col max-w-[1600px] mx-auto">
            <motion.div  className="w-11/12 mx-auto overflow-hidden ease-out shadow-xl rounded-2xl bg-info-content bg-opacity-70">
            <div className="p-4">
                <div className="p-0 text-center justify-items-end ">
                    <div className="flex px-4 py-4 min-w-[30%] text-left">
                        <div className="w-full m-auto">
                            <h2 className="text-lg font-bold leading-none tracking-widest text-gray-100 uppercase md:text-3xl">{project.title}</h2>
                            <p className="text-xs text-gray-400 md:text-sm">Due on: {project.date}</p>
                            <p className="text-sm italic tracking-wider text-gray-300 md:text-lg capitalize-first">{project.description}</p>
                        </div>
                    </div>

                    <div className="justify-center w-full p-4 pb-4 rounded-t-full lg:p-10">  
                        <div className="flex flex-col justify-between md:flex-row">
                            <h2 className="w-4/12 mt-1 text-2xl font-bold text-gray-200 lg:w-1/2 ">TASKS</h2>
                            <input 
                                    autoFocus
                                    type="text" 
                                    onKeyDown={handleAddTask} 
                                    value={input} 
                                    onChange={handleChange} 
                                    placeholder="Add new task" 
                                    className="my-2 text-center transition duration-300 rounded-lg outline-none md:my-0 md:w-7/12 focus:outline-none bg-base-100 input focus:scale-103" 
                                />
                        </div>
                        
                        <motion.div layout="position" className="flex flex-wrap justify-center gap-2 py-4 xl:gap-4 "> 
                                {project.tasks.length < 1 ? <p className="italic opacity-50">No active tasks.</p>
                                    :
                                    <>
                                        {project.tasks.map((task, i) => 
                                            <FromLeft key={i} delay={(i+2)*0.05} duration={0.3}>
                                                <ActiveTask 
                                                    task={task.task} 
                                                    completed={task.completed}
                                                    expandedTask={expand} 
                                                    onExpand={handleExpand}
                                                    onComplete={() => onComplete(task.task, project.id)} 
                                                    onUpdate={handleUpdate}
                                                    onDeleteTask={handleDeleteTask}
                                                >
                                                </ActiveTask>
                                            </FromLeft>
                                        )}
                                    </>
                                }
                        </motion.div>

                        {/* <div className="divider ">Completed</div>

                        <motion.div layout="position" className="flex flex-wrap justify-center gap-2 p-0 md:gap-3 xl:gap-4">
                            
                            {completedTasks.length < 1 ? <p className="italic opacity-50">There are no finished tasks yet.</p>:
                                <>
                                    {completedTasks.map((task,i) => 
                                    <FromLeft key={i} delay={0.2} duration={0.2}>
                                        <motion.div layout key={i}>
                                            <div className="join elevation-3">
                                                <span className="px-6 py-3 text-sm font-semibold text-center rounded-lg shadow-inner bg-opacity-80 bg-primary join-item grow text-stone-200 ">
                                                {task.task}
                                                </span>
                                            </div>
                                        </motion.div>
                                    </FromLeft>
                                    )}
                                </>
                            }
                        </motion.div> */}
                        
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-3 justify-items-stretch bg-base-200 bg-opacity-20">
                <button className="py-4 duration-300 justify-self-auto hover:bg-base-100 hover:text-stone-100 trantition">RETURN</button>
                <button className="py-4 duration-300 justify-self-auto hover:bg-base-100 hover:text-error trantition">
                    <i className="mr-3 fa fa-trash-can"></i>
                    DELETE
                </button>
                <button className="py-4 duration-300 justify-self-auto hover:bg-base-100 hover:text-success trantition">
                    <i className="mr-3 fa fa-check"></i>
                    MARK AS COMPLETED
                </button>
            </div>

        </motion.div>
        {/* <button onClick={doubleCheck} className="mx-auto mt-4 rounded-md hover:text-red-400 text-base-content btn-md btn btn-ghost">
            <i className="fa fa-trash-can fa-xl"></i>
            DELETE PROJECT
        </button> */}
        </motion.div>

        
        </JumpIn>
    </>
    )
}