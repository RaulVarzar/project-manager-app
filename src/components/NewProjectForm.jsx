import Input from "./Input"
import { useRef } from "react"

export default function NewProjectForm({onAdd}) {

    const titleRef = useRef()
    const descRef = useRef()
    const dateRef = useRef()

    function handleSave() {
        const enteredTitle = titleRef.current.value
        const enteredDescription = descRef.current.value
        const enteredDate = dateRef.current.value
        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            date: enteredDate
        })
        //validation to be added...
    }


    return(
        <div className="w-1/2 p-10 mx-auto rounded-xl bg-base-300 animate-fade-up animate-duration-300">
            <div className="flex flex-col">
                <Input ref={titleRef} label="Title"/>
                <Input ref={descRef} textarea label="Description"/>
                <Input type="date" ref={dateRef} label="Due date"/>
            </div>
            <div className="flex justify-end gap-4 mt-4">
                <button className="rounded-md btn btn-sm btn-ghost" >Cancel</button>
                <button className="rounded-md btn btn-sm btn-success" onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}