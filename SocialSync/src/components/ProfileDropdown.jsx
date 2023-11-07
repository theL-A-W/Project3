import Dropdown from 'react-bootstrap/Dropdown';

export default function ProfileDropdown (){
    return (
        
        <div className="profileDropdown">
                    <div className="profile">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="profile-img">
                    </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Sign-out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        </div>
)
}