import {AnimatePresence, motion} from "framer-motion"
import { useEffect } from "react";

export default function Alert({content, closeAlert}) {
    useEffect(() => {
        const timeout = setTimeout(() => {
          closeAlert()
        }, 5000)
    
        return () => {
          clearTimeout(timeout)
        }
      }, [content]);

      const alertType=" alert-"+content.type

    return  <AnimatePresence>
    {content && (
      <motion.div 
        key={content}
        initial={{y:"100%", scale:0}} 
        animate={{y:0, scale: 1}} 
        transition={{delay:0.2, duration:0.2}}
        exit={{y:"100%", scale:0,opacity:0, transition:{duration:0.2}}} 
        className="left-0 right-0 m-auto mb-6 w-fit toast"
        >
            <div className={"py-3 pl-6 mx-auto text-center alert " + (`${ alertType}`)}>
                <span>{content.message}</span>
            </div>
        </motion.div>
    )}
  </AnimatePresence>
}