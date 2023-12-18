import { useState, useEffect, useContext,createContext } from "react";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import NewProject from "./components/NewProjectForm.jsx"; 
import Project  from "./components/Project.jsx"
import Alert from "./components/Alert.jsx";
import HomePage from "./components/main/HomePage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { ProjectsContext } from "./Context.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const storedProjects = JSON.parse(localStorage.getItem('storedProjects')) || []

function App() {
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

  
  function handleSubmitProject( newProject) {  
    // add new project to current projects
    const updatedProjects = [ newProject, ...projectsState ]
    // update local storage to include the new project
    localStorage.setItem( 
      "storedProjects",
      JSON.stringify( updatedProjects )
    )
    setProjectsState(updatedProjects)
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

  function handleProjectCompleted () {
    const projectIndex = projectsState.findIndex(project => project.id === selectedProject.id)
    projectsState[projectIndex].completed = true
    localStorage.setItem(
      "storedProjects", 
      JSON.stringify(projectsState)
    );
    setShowAlert({message:'Project completed', type: "success"})
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
                  setCompleted={handleProjectCompleted}
                  >
                </Project>


  // <NewProject onSubmitNewProject={handleSubmitProject} cancelForm={handleCancelForm}/>
  // <ProjectsContext.Provider value={storedProjects}>
  //               <HomePage onSelectProject={handleSelectProject}/> 
  //             </ProjectsContext.Provider>
  
  // <div className="flex flex-col-reverse items-center w-full h-screen md:flex-row xl:px-8 bg-neutral"> 
  //     <Sidebar 
  //       onAddProject={handleAddNewProject} 
  //       activeProjects={projectsState} 
  //       onHomePage={() => handleCancelForm()}
  //       selectedProjectId={selectedProject && selectedProject.id}
  //     />
  //       <div className="grid items-center content-center w-full h-full px-4 py-10 mx-auto overflow-auto md:p-4 grow">
  //        {/* {content} */}
  //         {/* <Outlet />
  //          */}
  //      </div>
  //    </div>

  return (
    <Router>
      <div className="flex flex-col-reverse items-center w-full h-screen md:flex-row xl:px-8 bg-neutral"> 
        <Sidebar />
        <div className="grid items-center content-center w-full h-full px-4 py-10 mx-auto overflow-auto md:p-4 grow">
          <Routes>
            <Route path="/" element={<HomePage allProjects={projectsState} onSelectProject={handleSelectProject}/>}></Route>
            <Route path="new" element={<NewProject onSubmitNewProject={handleSubmitProject}/>}></Route>
            <Route path=":slug" element={<Project Projects={projectsState} deleteProject={handleDeleteProject} 
                  addTask={handleAddTask} 
                  onComplete={handleCompleteTask}
                  handleUpdate={handleUpdateTask}
                  handleDeleteTask={handleDeleteTask}
                  setCompleted={handleProjectCompleted}/>}></Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Alert content={showAlert} closeAlert={() => setShowAlert('')}/>
      </div>
    </Router>
  );
}

export default App;



