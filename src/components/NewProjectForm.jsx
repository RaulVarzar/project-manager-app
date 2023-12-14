import Input from "./Input"
import { useRef } from "react"
import Modal from "./Modal"
import uuid from 'react-uuid';

export default function NewProjectForm({onSubmitNewProject, cancelForm}) {

    const modal = useRef()

    const titleRef = useRef()
    const descRef = useRef()
    const dateRef = useRef()

    function handleSave() {
        const enteredTitle = titleRef.current.value
        const enteredDescription = descRef.current.value
        const enteredDate = dateRef.current.value

        if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDate.trim()=== ''){ //form validation
            modal.current.open()
            return
        }

        onSubmitNewProject({
            title: enteredTitle,
            description: enteredDescription,
            id: uuid(),
            date: enteredDate,
            tasks:[]
        })
    }

    return(
        <>
        <Modal ref={modal} errorText={'Please fill in all the fields'}> Invalid Input </Modal>
        <div className="w-10/12 p-10 pb-6 mx-auto transition duration-300 ease-in-out md:8/12 xl:w-1/2 elevation-5 rounded-xl bg-base-300 animate-fade-up animate-duration-300 hover:elevation-1np">
            <div className="flex flex-col">
                <Input ref={titleRef} label="Title"/>
                <Input ref={descRef} textarea label="Description"/>
                <Input type="date" ref={dateRef} label="Due date"/>
            </div>
            <div className="flex justify-end gap-4 mt-4">
                <button className="transition duration-300 rounded-md btn btn-sm md:btn-md btn-ghost hover:text-red-600" onClick={cancelForm}>Cancel</button>
                <button className="rounded-md btn btn-sm md:btn-md btn-primary" onClick={handleSave}>Save</button>
            </div>
        </div>
        </>
    )
}