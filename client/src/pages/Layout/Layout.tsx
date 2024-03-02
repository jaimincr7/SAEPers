import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

export default function Layout(){
    return (
        <div >
            <NavBar/>
            <div id="layout">
                <Outlet/>
            </div>
            <Footer/>
            
        </div>
    )
}