import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

export default function MyNavBar(){

    const links = [
        {
            to:"",
            title:"Home"
        },
        {
            to:"sneakers",
            title:"Sneakers"
        },
        {
            to:"brands",
            title:"Brands"
        }
    ]
    
    return(
        <Navbar bg="black" data-bs-theme="dark">
            <Container>
                <LinkContainer to="/" state={{ cursor: 'pointer' }}>
                    <Navbar.Brand className="fs-2">

                    <img 
                    src="https://images-platform.99static.com//zvgtch1g-AfvYKsLleHclChDLYE=/222x209:1707x1694/fit-in/500x500/projects-files/101/10165/1016553/09deac31-4bdc-4bb6-b6f2-e644b4ff0500.png"
                    alt="Logo"
                    width="50"
                    height="50"
                    
            />

                    </Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto fs-4">
                    {links.map((link) => (
                        <LinkContainer to={`/${link.to}`} key={link.to}>
                            <Nav.Link>{link.title}</Nav.Link>
                        </LinkContainer>
                    ))}
                </Nav>
            </Container>
        </Navbar>
    )
}