import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import NewProject from "./components/NewProjectForm.jsx"; 
import Project  from "./components/Project.jsx"
import NoProjectSelected from "./components/NoProjectSelected.jsx"

function App() {
  
  const [selectedProject, setSelectedProject] = useState(undefined);
  
  const [projectsState, setProjectsState] = useState(
    [
      { title: 'My React Project',
        description: 'this is my first test project',
        id: 1,
        date: '2023-11-11',
        tasks: [
          { task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.", completed: false },
          { task:"Maecenas blandit.", completed: false },
          { task:"Curabitur cursus nibh eget ipsum imperdiet ", completed: false },
        ]
      },
      { title: 'test project',
        description: 'this is my first test project',
        id: 2,
        date: '2023-11-11',
        tasks: [
          { task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit1.", completed: false },
          { task:"Maecenas blandit.1", completed: false },
          { task:"Curabitur cursus nibh eget ipsum imperdiet1 ", completed: true },
        ]
      }
    ]
  )


  // useEffect(() => {
  //   localStorage.setItem('storedProjects', JSON.stringify(projectsState));
  // }, [projectsState]);

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('storedProjects'));
  //   if (items) {
  //     setStoredProjects(items);
  //   }
  // }, []);

  function handleAddNewProject () { // DONE
    setSelectedProject(null)
  }

  function handleSubmitProject(newProject) {  //  DONE
    setProjectsState(prevProjectsState => [ newProject,...prevProjectsState]);
    setSelectedProject(undefined)
  }

  function handleDeleteProject() {   // DONE
    setProjectsState(projectsState.filter(item => item.id !== selectedProject.id));
    setSelectedProject(undefined)
  }

  function handleSelectProject(id){   // DONE
    setSelectedProject(projectsState.find(x => x.id === id))
  }

  function handleCancelForm(){  // DONE  used to close the cancel the new project form and go back to the main screen
    setSelectedProject(undefined)
  }

  function handleAddTask(task){
    const projectIndex = projectsState.findIndex(project => project.id === selectedProject.id)
    
    if (projectsState[projectIndex].tasks.filter(e => e.task === task).length < 1) { // check if task already exists 
      projectsState[projectIndex].tasks.push(
        {
          task: task, 
          completed: false
        }
      )
    }
  }

  function handleCompleteTask (task) {
    const projectIndex = projectsState.findIndex(project => project.id === selectedProject.id)  // the index of the selected project
    const currentTasks = projectsState[projectIndex].tasks 
    const taskIndex = currentTasks.findIndex( item => ( item.task === task )); //  the index of the task that needs to be updated
    currentTasks[taskIndex]['completed'] = true // updating the value for the given task
    setProjectsState ([ ...projectsState ])
  }

  let content = <Project 
                  project={selectedProject} 
                  deleteProject={handleDeleteProject} 
                  addTask={handleAddTask}
                  onComplete={handleCompleteTask}
                />

  if(selectedProject === null) {
    content = <NewProject onSubmitNewProject={handleSubmitProject} cancelForm={handleCancelForm}/>
  } else if (selectedProject === undefined){
    content = <NoProjectSelected onAddProject = {handleAddNewProject}/> 
  }

  return (
    <div className="flex w-full h-screen bg-neutral"> 
      <Sidebar 
        onAddProject={handleAddNewProject} 
        activeProjects={projectsState} 
        onSelectProject={handleSelectProject}
        selectedProjectId={selectedProject && selectedProject.id}
      />
      
      <div className="grid content-center w-full md:m-3 xl:m-4 bg-base-300 md:rounded-2xl elevation-3">
        {content}
      </div>
    </div>
  );
}

export default App;
