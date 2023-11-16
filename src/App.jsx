import { isValidElement, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import NewProject from "./components/NewProjectForm.jsx"; 
import Project  from "./components/Project.jsx"
import NoProjectSelected from "./components/NoProjectSelected.jsx"


function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [
      { title: 'My React Project',
        description: 'This is my first test project',
        id: 1,
        date: '2023-11-11',
        tasks: ['Duis eget elit mi. In hac habitasse.', 'Duis eget elit mi. In hac habitasse.', 'hello', 'Lorem ipsum']
    }
    ]
  })

  function handleAddNewProject () {
    setProjectsState( prevState => {
      return{
        ...prevState,
        selectedProject: null
      }
    })
  }

  function handleSubmitProject(projectData) {  // used to submit the form data and create a new project
    setProjectsState(prevState =>{
      const newProject = {
        ...projectData,
        id : Math.random(),
        tasks: []
      }
      return{
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject]
      }
  })
  }

  function handleDeleteProject() {  // used to submit the form data and create a new project
    setProjectsState(prevState =>{
      return{
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter((project) => project.id != prevState.selectedProject)
      }
  })
  }

  function handleSelectProject(id){
    setProjectsState( prevState => {
      return{
        ...prevState,
        selectedProject: (id)
      }
    })
  }

  function handleCancelForm(){  // used to close the cancel form and go back to the main screen
    setProjectsState( prevState => {
      return{
        ...prevState,
        selectedProject: undefined
      }
    })
    console.log(projectsState.projects)
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProject)

  let content = <Project project={selectedProject} deleteProject={handleDeleteProject}></Project>

  if(projectsState.selectedProject === null) {
    content = <NewProject onAdd={handleSubmitProject} cancelForm={handleCancelForm}/>
  } else if (projectsState.selectedProject === undefined){
    content = <NoProjectSelected onAddProject = {handleAddNewProject}/> 
  }


  return (
    <div className="flex"> 
      <Sidebar 
        onAddProject={handleAddNewProject} 
        activeProjects={projectsState.projects} 
        onSelectProject={handleSelectProject}
      />
      
      <div className="grid content-center w-full min-h-screen my-auto elevation-10">
            {content}
      </div>
     
    </div>
  );
}

export default App;
