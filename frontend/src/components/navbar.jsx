import React from 'react'
import './navbar.css'

const NavBar = () => {
    return (
        <div>
            <aside className = "NavBar">
                <ul className = "List">
                    <li className = "List-item"><a className = "A" href = "/table1">Table1</a></li>
                    <li className = "List-item"><a className = "A" href = "/table2">Table2</a></li>
                    <li className = "List-item"><a className = "A" href = "/table3">Table3</a></li>
                    <li className = "List-item"><a className = "A" href = "/table4">Table4</a></li>                 
                </ul>
            </aside>
        </div>
    )
}

export default NavBar;