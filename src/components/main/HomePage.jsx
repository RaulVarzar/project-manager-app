import ProjectCard from "./ProjectCard"
import{motion} from "framer-motion"
import { useContext } from "react";
import { ProjectsContext } from "../../Context.js";
import { Link } from "react-router-dom";

const demoVariants = {
  hidden: { opacity: 0, x:"-50%"},
  animate: {
    opacity:1,
    x:0,
    transition: {
      staggerChildren: 0.2,
      duration:0.3
    },
  },
};

export default function HomePage ({onAddProject,  onSelectProject, allProjects}) {

  const activeProjects = allProjects.filter((project) => !project.completed)
  const completedProjects = allProjects.filter((project) => project.completed)

    return(
      <>
        <div className="flex p-2 md:p-6 lg:p-16">
          <motion.div initial="hidden" variants={demoVariants} animate="animate" className="flex flex-row flex-wrap items-center content-center justify-center mx-auto my-10 h-fit sm:mb-0 lg:gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {allProjects.length < 1 && 
              <Link to={'new'}>
                <motion.div  className="flex flex-col items-center px-4 py-20 space-y-4 transition duration-300 rounded-md cursor-pointer w-96 group bg-info-content hover:bg-base-100" onClick={onAddProject}>
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-base-200 opacity-40 group-hover:opacity-100">
                    <i className="text-4xl fa-solid fa-plus "></i>
                  </div>
                  <p className="text-center text-stone-300">NEW PROJECT</p>
                </motion.div>
              </Link>
            }
            
              {activeProjects.map((project) =>  
                <motion.div key={project.id} variants={demoVariants}>
                  <ProjectCard key={project.id} info={project} onClick={() => onSelectProject(project.id)}/>
                </motion.div>
              )}

              {completedProjects.map((project) =>  
                <motion.div key={project.id} variants={demoVariants}>
                  <ProjectCard key={project.id} info={project} onClick={() => onSelectProject(project.id)}/>
                </motion.div>
              )}
            

          </motion.div>
        </div>
      </>
    )
}