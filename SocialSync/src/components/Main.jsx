import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import UserCalendar from './UserCalendar'
import Authentication from './Authentication'

export default function Main (){
    return (
        
        <div className="main">
            <Routes>
                <Route exact path ="/" element ={<Home/>} />
                <Route exact path ="/UserCalendar" element ={<UserCalendar/>} />
                <Route exact path ="/Authentication" element ={<Authentication/>} />
            </Routes>
        </div>
)
}