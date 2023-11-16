import { useState } from "react"

export default function Project( {project, tasks, deleteProject, addTask}) {

    const [input, setInput] = useState('')

    const selectedTasks = tasks.filter(task => task.projectId === project.id)

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
          <div className="transition duration-300 ease-in-out rounded-lg elevation-8 md:mx-10 lg:mx-12 xl:mx-36 bg-neutral animate-fade-up animate-duration-100 hover:elevation-4">
            <div className="p-0">
                <div className="p-0 text-center justify-items-end lg:flex">
                    <div className="flex px-0 py-4 rounded-t-lg min-w-[30%] lg:rounded-r-none lg:rounded-l-lg lg:px-10 bg-base-100 lg:text-right ">
                        <div className="w-full m-auto">
                            <h2 className="text-3xl font-bold leading-none tracking-wide text-gray-100 uppercase">{project.title}</h2>
                            <p className="text-sm leading-none text-gray-400">Due on: {project.date}</p>
                            <div className="m-0 divider"></div>
                            <p className="text-lg italic tracking-widest text-gray-300 capitalize-first">{project.description}</p>
                        </div>
                    </div>

                    <div className="justify-center w-full p-10 pb-4">  
                        <h2 className="mx-auto text-2xl font-bold text-center text-gray-200">TASKS:</h2>
                        <div className="flex flex-wrap justify-center gap-2 p-1 md:p-4">

                            <input 
                                type="text" 
                                onKeyDown={handleAddTask} 
                                value={input} 
                                onChange={handleChange} 
                                placeholder="Add new task" 
                                className="w-full max-w-xs rounded-lg outline-none cursor-pointer input elevation-2" 
                            />

                            {selectedTasks.map((task) => 
                                <span key={task.id} className="px-6 py-3 text-sm font-semibold text-center rounded-lg animate-fade-right animate-duration-300 bg-info-content grow text-neutral-content">{task.text}</span>
                            )}
                        </div>
                        
                        <button onClick={deleteProject} className="mx-auto mt-4 text-gray-300 btn-sm btn btn-ghost hover:text-red-500">
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