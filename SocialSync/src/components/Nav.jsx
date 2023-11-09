import Search from './Search'
import Authentication from './Login/Authentication'
import { Link } from 'react-router-dom'
import Pr from './Login/Pr'


export default function Nav (){
    return (
        
        <div className="nav">
            <div id="site-title"><Link to="/">SocialSync</Link></div>
            <Search />
            <Authentication/>
            <Pr/>
        </div>
)
}