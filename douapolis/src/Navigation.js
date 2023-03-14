import {React} from "react";
import {Container,Navbar,Nav,NavDropdown,Image} from "react-bootstrap"
import ImgAccueil from "./images/Accueil.png";
import ImgProfil from "./images/Profil.png";
import ImgDeco from "./images/deconnection.png";
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
//Page du menu de l'application 
function connected(isConnected){
    if(isConnected === true){
        return(
            <Nav className="m-auto">                  
                <NavDropdown title={"NomUser"} id="collasible-nav-dropdown" className="justify-content-right">
                    <NavDropdown.Item href="/Profil">
                        <Image alt="" src={ImgProfil} width="30" height="30" className="d-inline-block align-center me-2 " />
                        Profil
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/Profil">
                        <Image alt="" src={ImgDeco} width="30" height="30" className="d-inline-block align-center me-2 " />
                        Deconnexion
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        )
    }
    else {
        return(
            <Nav className="m-auto"> 
                <Nav.Link href="/Connexion">
                    <Image alt="" src={ImgProfil} width="30" height="30" className="d-inline-block align-center me-2 " />
                    Connexion
                </Nav.Link>
            </Nav>
        )
    }
}

function Navigation() {
    let isConnected = true; //useContext pour plus tard avec un const
    // il faudra modifier la deconnexion qui rejoint pour l'instant la page profil 
    // et creer une page profil different de statistiques avec dedans la modif du mdp et des amis
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
                        {/* Onglet Profil avec menu déroulant qui ne s'affiche que si on est connecte*/}   

                        {connected(isConnected)}

                    </Navbar.Collapse>
                </Container>
        </Navbar>
    )
}
                     
export default Navigation;