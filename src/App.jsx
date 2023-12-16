import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import NewProject from "./components/NewProjectForm.jsx"; 
import Project  from "./components/Project.jsx"
import NoProjectSelected from "./components/NoProjectSelected.jsx"
import Alert from "./components/Alert.jsx";
import HomePage from "./components/main/HomePage.jsx";

function App() {
  const storedProjects = JSON.parse(localStorage.getItem('storedProjects')) || []

  const [selectedProject, setSelectedProject] = useState(undefined);
  
  const [projectsState, setProjectsState] = useState(storedProjects)

  const [showAlert, setShowAlert] = useState("")

  useEffect(() => { // fetching data from local storage
    localStorage.setItem('projects', JSON.stringify(projectsState));
  }, [projectsState]);

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('projects'));
    if (projects) {
      setProjectsState(projects);
    }
  }, []);


  function handleAddNewProject () {
    setSelectedProject(null)
  }
console.log(selectedProject)
  function handleSubmitProject( newProject) {  
    // add new project to current projects
    console.log("new:",newProject)
    const updatedProjects = [ newProject, ...projectsState ]
    // update local storage to include the new project
    localStorage.setItem( 
      "storedProjects",
      JSON.stringify( updatedProjects )
    )
    // update state and go back to main page
    setProjectsState(updatedProjects);
    setSelectedProject(undefined) 
    setShowAlert({message:'Project added', type: "success"})
  }

  function handleDeleteProject() {   
    // filter projects from local storage and delete the selected project
    const updatedProjects = projectsState.filter((item) => item.id !== selectedProject.id);
    localStorage.setItem(
      "storedProjects", 
      JSON.stringify(updatedProjects)
    );
    // go back to main page and update project list
    setSelectedProject(undefined)
    setProjectsState(updatedProjects);
    setShowAlert({message:'Project deleted', type: "info"})
  }

  function handleSelectProject(id) {   
    setSelectedProject(projectsState.find(x => x.id === id))
  }

  function handleCancelForm() {  
    setSelectedProject(undefined)
  }

  function alreadyExists (task){
    const projectIndex = projectsState.findIndex(project => project.id === selectedProject.id)
    const listOfTasks = storedProjects[projectIndex].tasks.map((item) => item.task)
    return listOfTasks.includes(task)
  }

  function handleAddTask(task) {
    const projectIndex = projectsState.findIndex(project => project.id === selectedProject.id)
    if (!alreadyExists(task)){ 
      projectsState[projectIndex].tasks.push({ task: task, completed: false })
      storedProjects[projectIndex].tasks.push({ task: task, completed: false })
      setShowAlert({message:'Task added', type: "success"})
    } else{
      setShowAlert({message:'Task already exists', type: "warning"})
    }
    localStorage.setItem( 
      'storedProjects',
      JSON.stringify(storedProjects)
    )
  }

  function handleCompleteTask (task) {
    const projectIndex = projectsState.findIndex(project => project.id === selectedProject.id)  // the index of the selected project
    const currentTasks = projectsState[projectIndex].tasks 
    const taskIndex = currentTasks.findIndex( item => ( item.task === task )); //  the index of the task that needs to be updated
    currentTasks[taskIndex]['completed'] = true // updating the value for the given task
    localStorage.setItem(
      "storedProjects", 
      JSON.stringify(projectsState)
    );
    setShowAlert({message:'Task completed', type: "success"})
    setProjectsState ([ ...projectsState ])
  }

  function handleUpdateTask(task, inputValue) {
    const taskIndex = selectedProject.tasks.findIndex( item => ( item.task === task )); 
    if (!alreadyExists(inputValue)){
      selectedProject.tasks[taskIndex]['task'] = inputValue // updating the value for the given task
      localStorage.setItem(
        "storedProjects", 
        JSON.stringify(projectsState)
      );
      setShowAlert({message:'Task updated', type: "info"})
    } else {
      setShowAlert({message:'Task already exists', type: "warning"})
    }
    setProjectsState ([ ...projectsState ])
  }


  function handleDeleteTask(task){
    selectedProject.tasks = selectedProject.tasks.filter((item) => item.task != task)
    localStorage.setItem(
      "storedProjects", 
      JSON.stringify(projectsState)
    );
    setShowAlert({message:'Task deleted', type: "info"})
    setProjectsState ([ ...projectsState ])
  }


  let content = <Project 
                  project={selectedProject} 
                  deleteProject={handleDeleteProject} 
                  addTask={handleAddTask} 
                  onComplete={handleCompleteTask}
                  handleUpdate={handleUpdateTask}
                  handleDeleteTask={handleDeleteTask}
                  >
                </Project>

  if(selectedProject === null) {
    content = <NewProject onSubmitNewProject={handleSubmitProject} cancelForm={handleCancelForm}/>
  } else if (selectedProject === undefined){
    content = <HomePage onAddProject = {handleAddNewProject} activeProjects={projectsState} onSelectProject={handleSelectProject}/> 
  }

  return (
    <div className="flex w-full min-h-screen md:overflow-clip bg-neutral"> 
      <Sidebar 
        onAddProject={handleAddNewProject} 
        activeProjects={projectsState} 
        onHomePage={() => setSelectedProject(undefined)}
        selectedProjectId={selectedProject && selectedProject.id}
      />
      
      <div className="grid content-center w-full py-12 my-4 mr-4 bg-base-300 md:rounded-2xl elevation-3">
        {content}
        <Alert content={showAlert} closeAlert={() => setShowAlert('')}/>
      </div>
      
    </div>
  );
}

export default App;
