import {React,} from "react";
import {Container,Navbar,Nav,NavDropdown,Image} from "react-bootstrap"
import ImgAccueil from "./images/Accueil.png";
import ImgProfil from "./images/Profil.png";
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'

//Page du menu de l'application 
function Navigation() {

    //menu de navigation de l'application
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {/* Onglet accueil*/}
                        <Nav className="m-auto"> 
                            <Nav.Link href="/">
                                <Image alt="" src={ImgAccueil} width="30" height="30" className="d-inline-block align-center me-2 " />
                                Accueil
                            </Nav.Link>
                        </Nav>
                        {/* Onglet Profil avec menu déroulant*/}   
                        <Nav className="m-auto">                  
                            <NavDropdown title={"Profil"} id="collasible-nav-dropdown" className="justify-content-right">
                                <NavDropdown.Item href="/Profil">
                                    <Image alt="" src={ImgProfil} width="30" height="30" className="d-inline-block align-center me-2 " />
                                    Profil
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/Profil">
                                    <Image alt="" src={ImgProfil} width="30" height="30" className="d-inline-block align-center me-2 " />
                                    statistique
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/Profil">
                                    <Image alt="" src={ImgProfil} width="30" height="30" className="d-inline-block align-center me-2 " />
                                    Deconnion
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
        </Navbar>
    )
}
                     
export default Navigation;