import Search from './Search'
import Authentication from './Authentication'
import { Link } from 'react-router-dom'

export default function Nav (){
    return (
        
        <div className="nav">
            <div id="site-title"><Link to="/">SocialSync</Link></div>
            <Search />
            <Authentication/>
        </div>
)
}