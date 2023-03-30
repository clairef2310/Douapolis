import {React,useContext,useEffect} from "react";
import {Container,Navbar,Nav,NavDropdown,Image} from "react-bootstrap"
import ImgAccueil from "./images/Accueil.png";
import ImgProfil from "./images/Profil.png";
import ImgDeco from "./images/deconnection.png";
import ImgParam from "./images/parametre.png";
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import { UserContext } from "./testAuth/userAuth";
import { hasAuthenticated, getUser, logout } from "./testAuth/AuthApi";
//Page du menu de l'application 

function Navigation() {
    const [userState, setUserState] = useContext(UserContext);
    useEffect(() => {
        async function fetchData() {
            setUserState((state) => ({ ...state, userLogged: hasAuthenticated() }));
        }
        fetchData();
        return;
      }, [setUserState]);
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

                        {(userState.userLogged && (
                            <Nav className="m-auto">                  
                                <NavDropdown title={getUser()} id="collasible-nav-dropdown" className="justify-content-right">
                                    <NavDropdown.Item href={'/Profil/'}>
                                        <Image alt="" src={ImgProfil} width="30" height="30" className="d-inline-block align-center me-2 " />
                                        Profil
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/Parametres">
                                        <Image alt="" src={ImgParam} width="30" height="30" className="d-inline-block align-center me-2 " />
                                        Paramètres
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/" onClick={logout}>
                                        <Image alt="" src={ImgDeco} width="30" height="30" className="d-inline-block align-center me-2 " />
                                        Deconnexion
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        )) || (
                            <Nav className="m-auto"> 
                                <Nav.Link href="/Connexion">
                                    <Image alt="" src={ImgProfil} width="30" height="30" className="d-inline-block align-center me-2 " />
                                    Connexion
                                </Nav.Link>
                            </Nav>
                        )}

                    </Navbar.Collapse>
                </Container>
        </Navbar>
    )
}
                     
export default Navigation;