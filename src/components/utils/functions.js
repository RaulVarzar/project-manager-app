export function handleAddTask(task){
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