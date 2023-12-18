import Input from "./Input"
import { useRef, useState } from "react"
import Modal from "./Modal"
import uuid from 'react-uuid';
import { FadeIn, FromLeft, JumpIn } from './Animations'
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NewProjectForm({onSubmitNewProject}) {
    const modal = useRef()

    const titleRef = useRef()
    const descRef = useRef()
    const dateRef = useRef()

    const [inputValue, setInputValue] = useState('')
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState('')
    
    function addTask(newTask) {
        const listOfTasks = tasks.map((item) => item.task)
        if (inputValue && !listOfTasks.includes(newTask)) {
            setTasks((prevTasks) => { return [...prevTasks, {task: newTask, completed: false}]})
            setInputValue('')
            setError('')
        } else { setError('Task already exists')}
    }

    function removeTask(task) {
        setTasks(tasks.filter((item) => item.task != task) )
    }
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue) {
         addTask(inputValue)
        }
      };
    
    function handleSave() {
        const enteredTitle = titleRef.current.value
        const enteredDescription = descRef.current.value
        const enteredDate = dateRef.current.value
    
        if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDate.trim()=== ''){ //form validation
            modal.current.open()
            return
        }

        onSubmitNewProject({
            title: enteredTitle,
            description: enteredDescription,
            completed:false,
            id: uuid(),
            date: enteredDate,
            tasks: tasks
        })
    }

    return(
        <>
        <Modal ref={modal} errorText={'Please fill in all the fields'}> Invalid Input </Modal>
        <AnimatePresence mode="wait">
        <JumpIn duration={0.3} delay={0.1}>
            <motion.div layout className="w-10/12 p-10 pb-6 mx-auto ease-in-out shadow-xl md:8/12 xl:w-1/2 rounded-xl bg-base-300 hover:shadow-none">
                <h3 className="mb-6 text-2xl font-semibold text-center">NEW PROJECT</h3>
                <div className="flex flex-col">
                    <div className="grid grid-cols-1 gap-1 md:gap-4 md:grid-cols-2">
                        <Input type="text" ref={titleRef} label="Title" autoFocus/>
                        <Input type="date" ref={dateRef} label="Due date" />
                    </div>
                    <Input ref={descRef} textarea label="Description"/>
                    
                   <motion.ul layout className="flex flex-wrap items-center justify-start gap-1 py-2 xl:gap-4 "> 
                   <motion.div layout>
                     <Input type="text" error={error} label="Add tasks" value={inputValue} onKeyDown={handleKeyDown} onChange={() => setInputValue(event.target.value)}/> 
                   </motion.div>

                        {tasks.map((task) => 
                            <AnimatePresence key={task.task} mode="wait"> 
                                {task &&
                                <motion.div initial={{ opacity: 0, x:'-100%' }}  animate={{ opacity: 1, x:0 }}  exit={{x:'-100%', opacity:0, scale:0}}>
                                    <motion.li className="px-6 py-4 rounded-full cursor-pointer group hover:bg-base-200 hover:scale-103 bg-base-200 w-fit" key={task.task} onClick={() => removeTask(task.task)}>
                                        {task.task}
                                        <i className="ml-2 fa-solid fa-minus group-hover:text-error "></i>
                                    </motion.li>
                                </motion.div>}
                            </AnimatePresence> 
                        )}         
                    </motion.ul>
                   
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <Link to={'/'}>
                        <button className="transition duration-300 rounded-md btn btn-sm md:btn-md btn-ghost hover:text-red-600">Cancel</button
                    ></Link>
                    <button className="rounded-md btn btn-sm md:btn-md btn-primary" onClick={handleSave}>Save</button>
                </div>
            </motion.div>
        </JumpIn>
        </AnimatePresence>
        </>
    )
}