import ProjectCard from "./ProjectCard"
import{motion, stagger} from "framer-motion"

const demoVariants = {
  hidden: { opacity: 0, x:-30},
  animate: {
    opacity:1,
    x:0,
    transition: {
      staggerChildren: 0.2,
      duration:0.3
    },
  },
};

export default function HomePage ({onAddProject, activeProjects, onSelectProject}) {
    return(
      <>
        <div className="flex-1 p-2 md:p-4 lg:p-10">
          <motion.div initial="hidden" variants={demoVariants} animate="animate" className="mb-10 sm:mb-0 mt-10 grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 max-w-[1600px] mx-auto ">

            <motion.div variants={demoVariants} className="flex flex-col items-center px-4 py-20 space-y-4 rounded-md cursor-pointer group bg-info-content hover:bg-base-100 " onClick={onAddProject}>
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-base-200 opacity-40 group-hover:opacity-100">
                <i className="text-4xl fa-solid fa-plus "></i>
              </div>
              <p className="text-center text-stone-300">NEW PROJECT</p>
            </motion.div>

            
              {activeProjects.map((project) =>  
                <motion.div variants={demoVariants}>
                  <ProjectCard key={project.id} info={project} onClick={() => onSelectProject(project.id)}/>
                </motion.div>
              )}
            

          </motion.div>
        </div>
      </>
    )
}