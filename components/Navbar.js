import Link from 'next/link'
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Image
} from 'react-bootstrap'
import { useUser, useFetchUser } from '../utils/user' 

const Navigation = () => {
  const { user, loading} = useFetchUser();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Message Board</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link> */}
          </Nav>
          <Nav>
            {!loading && 
              (user ? (
                <>
                  <Nav>
                    <Link href="/me"><a><Button>Profile</Button></a></Link>
                  </Nav>
                  <Nav>
                    <Link href="/new"><a><Button>Create Message</Button></a></Link>
                  </Nav>
                  <Nav>
                    <Link href="/api/logout"><a><Button>Logout</Button></a></Link>
                  </Nav>
                  <Nav>
                    <Image src={user.picture} roundedCircle />
                  </Nav>
                </>
              ) : (
                <>
                  <Nav.Link href="/">Home</Nav.Link>
                </>
            ))}
          </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;