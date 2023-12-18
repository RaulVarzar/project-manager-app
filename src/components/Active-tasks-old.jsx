

<div className={"collapse " + (completed ? " bg-primary bg-opacity-30" : " bg-base-200")}>
                        <input type="checkbox" className='z-1'/> 
                        <div className="text-xl font-medium collapse-title">
                        { isEditing ?
                            <>
                                <input type="text" className="z-50 block w-full rounded-none input" autoFocus value={inputValue} onChange={() => handleEdit(task.task)}/>
                                {/* <i className="flex items-center h-auto px-4 text-white cursor-pointer fa-solid fa-check bg-secondary" onClick={() => validateUpdate()}></i> */}
                            </>
                        :
                           <> 
                                {task} 
                                {completed && <i className="ml-2 fa fa-check"></i>}
                            </>
                        }
                        </div>
                        <div className="px-0 pb-0 collapse-content"> 
                            <motion.div key={expandedTask} exit={{opacity:0, transition:{duration:0}}} className='grid grid-flow-col pb-0'>
                                {!isEditing  &&
                                    <>
                                        <button 
                                            className="relative z-50 border-none rounded-none btn hover:btn-primary"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button 
                                            className="relative border-none rounded-none btn hover:btn-error"
                                            onClick={() => modal.current.open()} 
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                        <button 
                                            onClick={() => onComplete()}
                                            className="relative border-none rounded-none btn hover:btn-accent"
                                        >
                                            <i className="fa fa-check"></i>
                                        </button>
                                    </>
                                }
                                {isEditing  && <button className="btn" onClick={() => validateUpdate()}>SUBMIT</button>}
                            </motion.div>
                        </div>
                    </div>