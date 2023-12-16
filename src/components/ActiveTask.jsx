import {motion, AnimatePresence} from 'framer-motion'
import { useState, useRef } from 'react'
import Modal from './Modal'

export default function ActiveTask({task, expandedTask, onExpand, onComplete, onUpdate, onDeleteTask, completed}){
    const modal = useRef()
    const [isEditing, setIsEditing] = useState()
    const [inputValue, setInputValue] = useState(task)

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
            <details className={"collapse min-w-[200px] text-center " + (completed ? " bg-primary bg-opacity-30" : " bg-base-200")}>

                <summary className="text-xl font-medium collapse-title"> 
                { isEditing ?
                            <>
                                <input type="text" className="z-50 block w-full bg-opacity-0 rounded-none input" autoFocus value={inputValue} onChange={() => handleEdit(task.task)}/>
                                {/* <i className="flex items-center h-auto px-4 text-white cursor-pointer fa-solid fa-check bg-secondary" onClick={() => validateUpdate()}></i> */}
                            </>
                        :
                           <> 
                                {task} 
                                {completed && <i className="ml-2 fa fa-check"></i>}
                            </>
                        }
                </summary>

                <div className="collapse-content"> 
                    <motion.div key={expandedTask} exit={{opacity:0, transition:{duration:0}}} className='grid grid-flow-col pb-0'>
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
                    </div>
            </details>      
        </>
    )
}