import { useState, useRef, useContext } from "react"
import Modal from "./Modal"
import { motion} from 'framer-motion'
import { FadeIn, JumpIn, FromLeft } from "./Animations"
import ActiveTask from "./ActiveTask"
import Input from "./Input"
import { Link, useParams, useNavigate } from "react-router-dom"

export default function Project( { Projects, deleteProject, addTask, onComplete, handleUpdate, handleDeleteTask, setCompleted}) {
    const navigate = useNavigate()

    const {slug} = useParams();    
    const project = Projects.find(item => item.id === slug)
  
    const [input, setInput] = useState('')
    
    const modal = useRef()   

    function onConfirm(){
        deleteProject()
        navigate('/')
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

    const activeTasks = project.tasks.filter((task) => {return task.completed === false})
    const completedTasks = project.tasks.filter((task) => {return task.completed === true})
    
    return (
        <>
        <Modal ref={modal} errorText={"This action can't be undone"} action={() => onConfirm()}>Delete  project?</Modal>
        <JumpIn duration={0.3} delay={0.1}>
            <motion.div layout className="flex flex-col max-w-[1500px] mx-auto overflow-hidden ease-out shadow-xl ma rounded-2xl bg-base-300">
            
                <div className="flex flex-col items-center p-4 lg:p-10 lg:flex-row justify-items-end">
                    <div className="w-full px-6 ">  
                        <div className="flex flex-col justify-center gap-2 px-4 lg:text-right min-w-fit">

                        <div className="flex flex-row justify-center w-full ">
                            <div className="pr-6 border-r-2 border-base-100">
                                <h2 className="text-lg font-bold leading-none tracking-widest text-gray-100 uppercase md:text-3xl">{project.title}</h2>
                                <p className="text-xs text-gray-400 md:text-sm">Due on: {project.date}</p>
                            </div>
                            <p className="pl-6 text-sm italic tracking-wider text-gray-300 md:text-lg capitalize-first">{project.description}</p>
                        </div>
                        <div className="relative w-1/2 mx-auto">
                            <Input type="text"  onKeyDown={handleAddTask} value={input} onChange={handleChange} autoFocus placeholder={'Add task'}/>
                        </div>
                        </div>
                       
                        <div className="py-4 mt-2 mb-6 bg-opacity-40 bg-neutral rounded-xl">
                            <p className="mx-auto text-center">Active</p>
                            <motion.div layout className="flex flex-row flex-wrap justify-center gap-1 p-6 sm:gap-2 md:grid-cols-2 xl:grid-cols-3 xl:gap-4"> 
                                {project.tasks.length < 1 ? <p className="italic opacity-50">No active tasks.</p>
                                        :
                                        <>
                                            {activeTasks.map((task, i) => 
                                                <FromLeft key={i} delay={(i+2)*0.05} duration={0.3}>
                                                    <ActiveTask 
                                                        task={task.task} 
                                                        completed={task.completed}
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
                        </div>

                        <div className="py-4 bg-neutral bg-opacity-40 rounded-xl">
                            <p className="mx-auto text-center">Completed</p>
                            <motion.div layout className="flex flex-row flex-wrap justify-center gap-1 p-6 sm:gap-2 md:grid-cols-2 xl:grid-cols-3 xl:gap-4"> 
                            
                                {completedTasks.map((task, i) => 
                                    <FromLeft key={i} delay={(i+2)*0.05} duration={0.3}>
                                        <ActiveTask 
                                            task={task.task} 
                                            completed={task.completed}
                                            onComplete={() => onComplete(task.task, project.id)} 
                                            onUpdate={handleUpdate}
                                            onDeleteTask={handleDeleteTask}
                                        >
                                        </ActiveTask>
                                    </FromLeft>
                                )}
                            </motion.div>
                        </div>
                        
                    </div>
                </div>
            
            
                <div className="grid grid-cols-3 justify-items-stetch bg-base-200 bg-opacity-20">
                    <Link to={'/'}>
                        <div className="w-full py-4 text-center duration-300 justify-self-auto hover:bg-base-100 hover:text-stone-100 trantition">
                            <i className="mr-3 fa-solid fa-home"></i>
                            RETURN
                        </div>
                    </Link>
                    <button className="py-4 duration-300 justify-self-auto hover:bg-base-100 hover:text-error trantition" onClick={() => modal.current.open()}>
                        <i className="mr-3 fa fa-trash-can"></i>
                        DELETE
                    </button>
                    {!project.completed ?
                        <button className="py-4 duration-300 justify-self-auto hover:bg-base-100 hover:text-success trantition" onClick={() => setCompleted()}>
                            <i className="mr-3 fa fa-check"></i>
                            MARK AS COMPLETED
                        </button>
                    :
                        <div className="flex items-center bg-accent bg-opacity-30"> <p className="mx-auto">PROJECT COMPLETE</p></div>
                    }
                </div>
            

        </motion.div>
        </JumpIn>
    </>
    )
}