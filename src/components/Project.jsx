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
          <div className="w-11/12 mx-auto transition duration-200 ease-out rounded-lg xl:w-10/12 elevation-5 bg-base-300 animate-fade-up animate-duration-100 hover:elevation-2">
            <div className="p-0">
                <div className="p-0 text-center justify-items-end lg:flex">
                    <div className="flex px-0 py-4 rounded-t-lg min-w-[30%] lg:rounded-r-none lg:rounded-l-lg lg:px-10 bg-base-200 lg:text-right ">
                        <div className="w-full m-auto">
                            <h2 className="text-lg font-bold leading-none tracking-widest text-gray-100 uppercase md:text-3xl">{project.title}</h2>
                            <p className="text-xs text-gray-400 md:text-sm">Due on: {project.date}</p>
                            <div className="m-0 lg:divider"></div>
                            <p className="text-sm italic tracking-wider text-gray-300 md:text-lg capitalize-first">{project.description}</p>
                        </div>
                    </div>

                    <div className="justify-center w-full p-4 pb-4 lg:p-10">  
                        <div className="flex justify-between">
                            <h2 className="mt-1 text-2xl font-bold text-gray-200">TASKS</h2>
                            <input 
                                    autoFocus
                                    type="text" 
                                    onKeyDown={handleAddTask} 
                                    value={input} 
                                    onChange={handleChange} 
                                    placeholder="Add new task" 
                                    className="w-1/2 max-w-xs mr-2 rounded-lg outline-none focus:outline-none bg-base-100 input" 
                                />
                        </div>
                            
                        <div className="flex flex-wrap py-4 justify-normal md:gap-2 xl:gap-4 ">
                           

                            {selectedTasks.map((task) => 
                                <div key={task.id} className="flex-auto my-1 transition duration-200 ease-out grow animate-duration-200 animate-fade-right join elevation-6 hover:elevation-1">
                                    <span className="p-2 text-sm font-semibold text-center rounded-lg shadow-inner lg:px-6 lg:py-3 join-item bg-info-content grow text-neutral-content ">
                                    {task.text}
                                    </span>
                                    <button 
                                        onClick={() => onComplete(task)}
                                        className="h-full btn btn-default hover:btn-accent join-item">
                                        <i className="fa fa-check"></i
                                        >
                                    </button>
                                </div>
                                    
                            )}
                        </div>

                        <div className="divider divider-neutral">Completed</div>
                        {selectedCompletedTasks.length < 1 ? <p>There are no completed tasks yet</p> : 
                        <div className="flex flex-wrap justify-center gap-1 p-0 md:gap-2 xl:gap-4">
                            {selectedCompletedTasks.map((task) => 
                                <div key={task.id} className="tooltip" data-tip="Completed">
                                    <div  className="transition duration-200 ease-out animate-duration-200 animate-fade-down join elevation-3">
                                        <span className="px-6 py-3 text-sm font-semibold text-center rounded-lg shadow-inner bg-accent join-item grow text-neutral-content ">
                                        {task.text}
                                        </span>
                                    </div>
                                </div>
                             )}
                        </div>
                    }
                         
                        
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