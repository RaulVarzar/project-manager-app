import image from "../assets/no-projects.png"
import Button from "./Button"

export default function NewProject({onAddProject}) {
    return( 
        <div className="w-1/2 mx-auto">
            <img className="w-1/2 mx-auto opacity-40" src={image} alt="" />
            <h2 className="my-8 text-3xl text-center uppercase opacity-50 text-zinc-100">Select a project or add a new one</h2>
            <Button onClick={onAddProject}>
                <i className="fa-solid fa-square-plus"></i>
                NEW PROJECT
            </Button>    
        </div>
    )
}