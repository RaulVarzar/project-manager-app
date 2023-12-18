import {motion, AnimatePresence} from 'framer-motion'
import { useState, useRef } from 'react'
import Modal from './Modal'

export default function ActiveTask({task, onComplete, onUpdate, onDeleteTask, completed}){
    const modal = useRef()
    const [isEditing, setIsEditing] = useState()
    const [inputValue, setInputValue] = useState(task)
    const [expanded, setExpanded] = useState(false)

    function handleEdit() {
        setInputValue(event.target.value)
    }

    function validateUpdate () { 
        if (task != inputValue) {
            onUpdate(task, inputValue) 
            setInputValue(task)
        } setIsEditing(false)
        
    }

    return(
        <><Modal ref={modal} errorText={"This action can't be undone"} action={() => onDeleteTask(task)}> Delete task? </Modal>
            <motion.div 
                layout
                className={"rounded-xl w-full grow  min-h-[64px] p-2 lg:px-4 flex justify-between items-center transition duration-300 hover:scale-103" + (completed ? " bg-primary bg-opacity-30" : " bg-base-200")}
                onClick={() => setExpanded(!expanded)}
            >

                <div className="mx-2">
                    { isEditing &&
                        <input type="text" className="block w-full bg-opacity-0 rounded-lg input" autoFocus value={inputValue} onChange={() => handleEdit(task.task)}/>
                    }
                    {!isEditing && 
                        <p>{task}</p>
                    }
                </div>
                
                {expanded &&
                    <>
                        {!completed && !isEditing && 
                            <div className='flex gap-2 ml-2'>
                                <button 
                                    className="btn hover:btn-primary"
                                    onClick={() => setIsEditing(true)}
                                >
                                <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button 
                                    className=" btn hover:btn-error"
                                    onClick={() => modal.current.open()}
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                                <button 
                                    onClick={() => onComplete()}
                                    className=" btn hover:btn-accent"
                                >
                                    <i className="fa fa-check"></i>
                                </button>
                            </div>
                        }
                    </>
                }
                
                {isEditing && 
                <button className=" btn hover:btn-info" onClick={() => validateUpdate()}> 
                    <i className="fa-solid fa-check"></i>
                </button>
                }
                {completed && <i className="py-4 fa fa-check-double"></i>}


                {/* <motion.div layout className="transition duration-500 collapse-content"> 
                    <motion.div  key={expandedTask} exit={{opacity:0, transition:{duration:0}}} className='grid grid-flow-col pb-0 overflow-hidden rounded-xl'>
                                        {!isEditing  &&
                                            <>
                                                <button 
                                                    className="relative z-50 border-none rounded-none btn hover:btn-primary"
                                                    onClick={() => setIsEditing(true)}
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button 
                                                    className="relative border-none rounded-none btn hover:btn-error"
                                                    onClick={() => modal.current.open()}
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                                <button 
                                                    onClick={() => onComplete()}
                                                    className="relative border-none rounded-none btn hover:btn-accent"
                                                >
                                                    <i className="fa fa-check"></i>
                                                </button>
                                            </>
                                        }
                                        {isEditing  && <button className="btn" onClick={() => validateUpdate()}>SUBMIT</button>}
                        </motion.div>
                    </motion.div> */}
            </motion.div>      
        </>
    )
}