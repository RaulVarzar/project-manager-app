import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import NewProject from "./components/NewProjectForm.jsx"; 
import Project  from "./components/Project.jsx"
import NoProjectSelected from "./components/NoProjectSelected.jsx"


function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: []
  })

  function handleAddNewProject () {
    setProjectsState( prevState => {
      return{
        ...prevState,
        selectedProject: null
      }
    })
  }

  function handleSubmitProject(projectData) {
    setProjectsState(prevState =>{
      const newProject = {
        ...projectData,
        id : Math.random()
      }
      return{
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject]
      }
  })
  }

  let content

  if(projectsState.selectedProject === null) {
    content = <NewProject onAdd={handleSubmitProject}/>
  } else if (projectsState.selectedProject === undefined){
    content = <NoProjectSelected onAddProject = {handleAddNewProject}/> 
  }

  return (
    <>
      <main className="flex min-h-screen bg-base-200">

        <Sidebar onAddProject={handleAddNewProject} activeProjects={projectsState.projects}></Sidebar> 

        <div className="flex flex-col w-full my-auto">
            {content}
            {/* <Project></Project> */}
        </div>
      </main>
    </>
  );
}

export default App;
