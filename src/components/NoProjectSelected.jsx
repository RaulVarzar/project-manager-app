import image from "../assets/no-projects.png"
import Button from "./AddNewButton"

export default function NewProject({onAddProject}) {
    return( 
        <div className="w-1/2 mx-auto">
            <img className="w-1/2 mx-auto opacity-40" src={image} alt="" />
            <h2 className="my-8 text-3xl text-center uppercase opacity-50 text-zinc-400">Select a project or add a new one</h2>
            <Button onClick={onAddProject}>NEW PROJECT</Button>    
        </div>
    )
}