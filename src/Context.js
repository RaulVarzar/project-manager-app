import { createContext } from "react"

const storedProjects = JSON.parse(localStorage.getItem('storedProjects')) || []

export const ProjectsContext = createContext([])


