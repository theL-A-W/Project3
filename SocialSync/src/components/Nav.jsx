import Search from './Search'
// import Authentication from './Authentication'
import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

export default function Nav (){
    return (
        
        <div className="nav">
            <div id="site-title"><Link to="/">SocialSync</Link></div>
            <Search />
<LoginButton/>
<LogoutButton/>
            {/* <Authentication/> */}
        </div>
)
}