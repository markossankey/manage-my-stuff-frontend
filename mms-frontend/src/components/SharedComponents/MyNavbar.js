import { Navbar, Container, Nav } from "react-bootstrap"
import { Link } from 'react-router-dom'
import GoogleLoginButton from './GoogleStuff/GoogleLoginButton'
import GoogleLogoutButton from './GoogleStuff/GoogleLogoutButton'
import { isUserLoggedIn } from "../../API/apiHelpers"
import { useState } from 'react'

function MyNavbar(props) {


  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Navbar className="navbar-dark align-items-center border-bottom mb-3" expand="md">
        <Container>
          <div style={{ width: '10rem' }}>
            <Navbar.Brand>
              <Link to="/"><img src="./logo.png" style={{ width: '3.5rem' }} alt="logo" /></Link>
            </Navbar.Brand>
          </div>
          <Nav className="d-flex justify-content-center">
            <Link to="/customers">Customers</Link>&nbsp;|&nbsp;
            <Link to="/schedule">Schedule</Link>&nbsp;|&nbsp;
            <Link to="/send-reminders">Reminders</Link>
          </Nav>
          <div style={{ width: '10rem' }}>
            {loggedIn
              ? <GoogleLogoutButton loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              : <GoogleLoginButton loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            }
          </div>
        </Container>
      </Navbar >
    </>
  )
}

export default MyNavbar
