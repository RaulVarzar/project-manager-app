import { useState } from "react"

export default function Project( {project, tasks, completedTasks, deleteProject, addTask, onComplete}) {

    const [input, setInput] = useState('')

    const selectedTasks = tasks.filter(task => task.projectId === project.id)
    const selectedCompletedTasks = completedTasks.filter(task => task.projectId === project.id)

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


    const formattedDate = new Date(project.date).toLocaleDateString('en-GB', {
        year: 'numeric', month: 'short', day:'numeric'
    })

    return(
        <>
          <div className="transition duration-200 ease-out rounded-lg elevation-8 md:mx-10 lg:mx-12 xl:mx-36 bg-base-300 animate-fade-up animate-duration-100 hover:elevation-4">
            <div className="p-0">
                <div className="p-0 text-center justify-items-end lg:flex">
                    <div className="flex px-0 py-4 rounded-t-lg min-w-[30%] lg:rounded-r-none lg:rounded-l-lg lg:px-10 bg-base-200 lg:text-right ">
                        <div className="w-full m-auto">
                            <h2 className="font-bold leading-none tracking-widest text-gray-100 uppercase md:text-3xl">{project.title}</h2>
                            <p className="text-xs leading-none text-gray-400 md:text-sm">Due on: {project.date}</p>
                            <div className="m-0 divider"></div>
                            <p className="italic tracking-wider text-gray-300 md:text-lg capitalize-first">{project.description}</p>
                        </div>
                    </div>

                    <div className="justify-center w-full p-10 pb-4">  
                        <h2 className="mx-auto text-2xl font-bold text-center text-gray-200">TASKS:</h2>
                        <div>
                        <div className="flex flex-wrap gap-1 p-1 pb-0 justify-normal md:gap-2 xl:gap-4 md:p-4">
                            <input 
                                autoFocus
                                type="text" 
                                onKeyDown={handleAddTask} 
                                value={input} 
                                onChange={handleChange} 
                                placeholder="Add new task" 
                                className="w-1/2 max-w-xs mr-2 rounded-lg outline-none inset-shadow bg-base-100 input" 
                            />

                            {selectedTasks.map((task) => 
                            <div key={task.id} className="tooltip tooltip-right" data-tip="Mark as completed">
                                <div  className="flex-auto h-12 transition duration-200 ease-out grow animate-duration-200 animate-fade-right join elevation-6 hover:elevation-1">
                                    <span className="px-6 py-3 text-sm font-semibold text-center rounded-lg shadow-inner join-item bg-info-content grow text-neutral-content ">
                                    {task.text} 
                                    </span>
                                <button 
                                    onClick={() => onComplete(task)}
                                    className="btn btn-default hover:btn-accent join-item">
                                    <i className="fa fa-check"></i
                                    ></button></div>
                                    </div>
                            )}
                        </div>

                        <div className="divider divider-neutral">Completed tasks</div>
                        <div className="flex flex-wrap justify-center gap-1 p-0 md:gap-2 xl:gap-4">
                            {selectedCompletedTasks.map((task) => 
                            <div key={task.id} className="tooltip" data-tip="Completed">
                                <div  className="transition duration-200 ease-out animate-duration-200 animate-fade-down join elevation-3">
                                    <span className="px-6 py-3 text-sm font-semibold text-center rounded-lg shadow-inner bg-accent join-item grow text-neutral-content ">
                                    {task.text} 
                                    </span>
                                </div></div>
                        )}
                        </div>
                        </div>
                         
                        
                        <button onClick={deleteProject} className="mx-auto mt-8 text-gray-300 btn-sm btn btn-ghost hover:text-red-500">
                            <i className="fa fa-trash-can"> </i>
                            Delete project
                        </button>
                    </div>
                    
                    
                </div>
                
                
            </div>
        </div>
            
        </>
    )
}