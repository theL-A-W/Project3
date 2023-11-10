import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import UserCalendar from './UserCalendar'
import UserHomePage from './UserHomePage'
import Profile from './Profile'
import NavSearch from './Search'
// import Authentication from './Authentication'
// import AuthCallback from '../components/Login/AuthCallback';

export default function Main (){
    return (
        
        <div className="main">
            <Routes>
                <Route exact path ="/" element ={<Home/>} />
                <Route exact path ="/usercalendar" element ={<UserCalendar/>} />
                <Route exact path ="/UserHomePage" element ={<UserHomePage/>} />
                <Route exact path ="/Profile" element ={<Profile/>} />
                <Route exact path ="/Profile" element ={<NavSearch/>} />
                {/* <Route exact path ="/Authentication" element ={<Authentication/>} /> */}
                {/* <Route exact path="/callback" element={<AuthCallback />} />  */}
            </Routes>
        </div>
)
}