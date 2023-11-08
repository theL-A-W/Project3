import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function ProfileDropdown (){
    let navigate=useNavigate()

    return (
        
        <div className="profileDropdown">
                    <div className="profile">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="profile-img">
                    </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>(navigate(`/UserHomePage`))}>User Home</Dropdown.Item>
                    <Dropdown.Item onClick={()=>(navigate(`/Profile`))}>Profile</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Sign-out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        </div>
)
}