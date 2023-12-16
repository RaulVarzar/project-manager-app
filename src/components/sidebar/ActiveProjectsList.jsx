import {motion, AnimatePresence} from 'framer-motion'
import { FromLeft } from '../Animations'

export default function ActiveProjectsList({activeProjects, selectedProjectId, onSelectProject}) {
    return(
        <ul className="p-0 py-4 mx-auto mt-4 transition duration-200 ease-out menu md:menu-lg">
            <li className="mx-auto transition duration-300 -translate-x-1 md:translate-x-0 md:mx-0">
                <h2 className="transition duration-[400ms] ease-in-out md:text-lg text-white menu-title group-hover:text-primary">Active Projects</h2>
                    
                <motion.ul layout className="ml-2 overflow-hidden border-l-2 border-l-base-300 group">
                    <AnimatePresence>
                        {activeProjects.map( (project, i) => {
                            let classes = 'w-full hover:text-white mb-2 w-fit '
                            if (project.id === selectedProjectId){
                                classes += ' text-primary font-bold'
                            }
                            return( 
                                <FromLeft key={project.id} duration={0.3} delay={i*0.2}>
                                    <motion.li layout="position" key={project.id} className={classes} >
                                        <p className="p-2" onClick={() => onSelectProject(project.id)} >{project.title}</p>
                                    </motion.li>
                                </FromLeft>
                                )
                            }
                        )}
                    </AnimatePresence>
                </motion.ul>
            </li>
        </ul>
    )
}