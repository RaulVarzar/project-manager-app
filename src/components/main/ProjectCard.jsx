import {motion} from "framer-motion"
import image from "../../assets/project.png"
import { Link } from "react-router-dom"

export default function ProjectCard({info, onClick}) {

    const active = "relative w-64 lg:w-96 flex flex-col items-center  px-4 transition duration-300 rounded-md shadow-xl cursor-pointer group bg-base-200 hover:bg-base-100 py-8 sm:py-20 hover:shadow-sm hover:scale-98"
    const complete = "relative w-64 lg:w-96 flex flex-col items-center px-4 transition duration-300 rounded-md shadow-xl disabled group bg-base-300 hover:bg-base-100 py-8 sm:py-20 hover:shadow-sm hover:scale-98"

    return(
        <Link to={`/${info.id}`}>
            <div className={info.completed ? complete : active} onClick={onClick}>
                <img className="object-cover object-center w-20 h-20 rounded-full" src={image} alt="dancing" />
                <h4 className="text-2xl font-bold text-center text-white capitalize">{info.title}</h4>
                <p className="text-white/50">{info.description}</p>
                {!info.completed && <p className="absolute inline-flex items-center text-xs top-4 text-white/20">Due on {info.date} </p> }
                {info.completed && <p className="absolute inline-flex text-success top-4">Project completed</p>}
            </div>
        </Link>
    )
}