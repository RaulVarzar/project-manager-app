import {motion} from "framer-motion"
import image from "../../assets/project.png"

export default function ProjectCard({info, onClick}) {
    return(
        <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <div className="relative flex flex-col items-center px-4 py-6 transition duration-300 rounded-md shadow-xl cursor-pointer group bg-base-200 hover:bg-base-100 sm:py-20 hover:shadow-sm hover:scale-98" onClick={onClick}>
                <img className="object-cover object-center w-20 h-20 rounded-full" src={image} alt="dancing" />
                <h4 className="text-2xl font-bold text-center text-white capitalize">{info.title}</h4>
                <p className="text-white/50">{info.description}</p>
                <p className="absolute inline-flex items-center text-xs top-4 text-white/20">Due on {info.date} </p>
            </div>
        </motion.div>
    )
}