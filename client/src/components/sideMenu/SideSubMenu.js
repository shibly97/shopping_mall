import React,{useState} from 'react'
import './css/SideSubMenu.css'
import {NavLink,Link} from 'react-router-dom'

function SideSubMenu({item,key,isMobile,handleMenuOpen}) {

    const [openSubMenu,setSubMenuOpen] = useState(false)

    const handleSubMenu = () =>{
        // open the submenu if available
        setSubMenuOpen(!openSubMenu)

        // if its on mobile view and do not have submenu 
        // then onclick sidemenu should close
        if(isMobile && !item.subMenu){
            handleMenuOpen()
        }
    }

    const handleClosing = (subItem) =>{
        if(isMobile && !subItem.subMenu){
            handleMenuOpen()
        }
    }

    console.log(item.path)
    return (
        <div >

        <NavLink exact strict to={item.path} activeClassName={item.subMenu? '' : "sidemenu-menu-active"}  key={key} className="sidemenu-menu-deactive" >
            <div>
                <div onClick={handleSubMenu}>
                    {item.title}
                </div>

            {item.subMenu && openSubMenu? item.subMenu.map((subItem,index)=>{
                    return <NavLink to={subItem.path} activeClassName="sidemenu-submenu-active" key={index} 
                    onClick={() => handleClosing(subItem)
                    }
                    > {subItem.title} </NavLink>})
                    :null}
            </div> 
        </NavLink>
            
        </div>
    )
}

export default SideSubMenu
