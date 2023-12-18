import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ThemePicker() {
    const themes = ['dark', 'coffee', 'aqua']
    const [dropdown, setDropdown] = useState(false)

    const [activeTheme, setActiveTheme] = useState(
        JSON.parse(localStorage.getItem('storedTheme'))
      );
    
      useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', activeTheme);
        localStorage.setItem('storedTheme', JSON.stringify(activeTheme));
      }, [activeTheme]);

    return(
          <details className="dropdown dropdown-right">
            <summary className="w-full btn-ghost btn" onClick={() => setDropdown(!dropdown)}>
            <i className="fa-solid fa-sliders"></i>
              <i className={"fa-solid fa-chevron-right transition duration-300 " + (dropdown && " -rotate-180")}></i>
            </summary>
              <motion.ul key={dropdown} exit={{opacity:0}} initial={{opacity:0}} animate={{opacity:1}} className="mb-1 ml-2 shadow menu dropdown-content bg-base-100 rounded-box w-fit">
              {themes.map((theme) => 
                    <li key={theme} className="inline m-1"> 
                      <input type="radio" name="theme-dropdown" className="justify-start uppercase theme-controller btn btn-sm btn-block btn-ghost" onChange={() => setActiveTheme(theme)} aria-label={theme} checked={theme===activeTheme}/>
                    </li>
                  )}
              </motion.ul>
          </details>
    )
}