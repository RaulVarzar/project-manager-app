import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import NewProject from "./components/NewProjectForm.jsx"; 
import Project  from "./components/Project.jsx"
import NoProjectSelected from "./components/NoProjectSelected.jsx"
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [
      { title: 'My React Project',
        description: 'this is my first test project',
        id: 1,
        date: '2023-11-11',
      },
      { title: 'next.js project',
        description: 'this is my second test project',
        id: 2,
        date: '2024-1-12',
      }],
    tasks: [
      {text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', projectId:1, id:1},
      {text:'Maecenas blandit.', projectId:1, id:2},
      {text:'Curabitur cursus nibh eget ipsum imperdiet ', projectId:1, id:3}
    ],
    completedTasks :[]
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
        id : Math.random()
      }
      return{
        ...prevState,
        selectedProject: undefined,
        projects: [newProject, ...prevState.projects]
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
  }

  function handleAddTask(text){
    setProjectsState(prevState =>{
      const taskId = Math.random()
      const newTask = {
        text:text,
        projectId: prevState.selectedProject,
        id: taskId,
      }
      return{
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
  })
  }

  function handleCompleteTask(task){
    setProjectsState(prevState =>{
      const newCompletedTask = {  // create copy of selected task
        text: task.text,
        projectId: task.projectId,
        id: task.id,
      }
      // const newTasks = projectsState.tasks.filter(object => {
      //   return object.id !== task.id;
      // })
      return{
        ...prevState,
        completedTasks: [newCompletedTask, ...prevState.completedTasks],
        tasks:[...prevState.tasks.filter((task) => task.id !== newCompletedTask.id)]
      }
  })
  }

  function submit () {
    return(
    confirmAlert({
      title: 'Are you sure you want to delete this project?',
      buttons: [
        {
          label: 'Yes',
          onClick:  handleDeleteProject
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    }))
  };


  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProject)

  let content = <Project 
                  tasks={projectsState.tasks} 
                  completedTasks={projectsState.completedTasks}
                  project={selectedProject} 
                  deleteProject={submit} 
                  addTask={handleAddTask}
                  onComplete={handleCompleteTask}
                />

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
        selectedProject={projectsState.selectedProject}
      />
      
      <div className="grid content-center w-full min-h-screen my-auto elevation-8 hover:elevation-11">
            {content}
      </div>
     
    </div>
  );
}

export default App;
