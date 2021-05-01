import React,{useState,useEffect} from 'react'
import './css/SideMenu.css'
import SideSubMenu from './SideSubMenu'
import {sideMenuData} from './SideMenuData'


function SideMenu() {

    const [sideMenuOpen,setSideMenuOpen] = useState(true)
    const [isMobile,setIsMobile] = useState(false)

    const handleMenuOpen = () => {
        setSideMenuOpen(!sideMenuOpen)
    }

    const watchWidth = () =>{
        if(window.innerWidth < 960){
            setSideMenuOpen(false)
            setIsMobile(true)

        }
        else{
            setSideMenuOpen(true)
            setIsMobile(false)
        }
    }

    useEffect(() => {
        // watching the width on initial rendering
        watchWidth()
    },[])

    // watching the with when the browser size getting change
    window.addEventListener('resize',watchWidth)

    return (
        <div className={sideMenuOpen? "sidemenu-container-open": "sidemenu-container-close"}>

            <div className="menuhandler" onClick={handleMenuOpen}>
                <span class="iconify" data-icon="mdi:arrow-collapse-left" data-inline="false"></span>
            </div>

            <div className="menuitems">
            {sideMenuData.map((item,index)=>{

                return <SideSubMenu item={item} key={index} isMobile={isMobile} handleMenuOpen={handleMenuOpen}/>

            })}
            </div>

        </div>
    )
}

export default SideMenu
