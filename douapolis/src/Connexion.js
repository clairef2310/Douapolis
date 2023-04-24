import {Container,Form,Button,Row,Col,ListGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState, React} from 'react';
import Navigation from "./Navigation";
import { login } from "./testAuth/AuthApi";

//Page de connexion de l'application
function Connexion() {
    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [pseudo, setpseudo] = useState(''); 
    const [pass, setpass] = useState('');
    let navigate = useNavigate();
     //Verification des données de connexion puis envoie à la page d'accueil
     //la fonction n'est pas encore faire

    async function Connect (){
        if(pseudo !== "" && pass !=="") {
            const response = await fetch(`http://localhost:5000/users/${pseudo}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const users = await response.json();
            if (!users) {
                window.alert(`Record with pseudo ${pseudo} not found`);
                return;
            }
            //Si les mdp correspondent
            if(pass===users.mdp) {
                login(pseudo);
                sessionStorage.setItem('estConnecte',true)
                navigate(`/Profil/`);
            } 
            //sinon
            else{
                alert("Le mdp n'est pas le bon.");
            }
        } 
        else{
            alert("Merci de remplir correctement le formulaire de connexion.");
        }
    };

    //formulaire et titre afficher sur la page 
    return(
        <div className="body">
            <Navigation/>
                <Container>
                    <div className="Douapolis">
                        <center><h1> DOUAPOLI$ </h1></center>
                    </div>
                    <div className="Centre">                       
                        <Row className="row h-100 justify-content-center align-items-center">
                            <Col xs={5} align='center'>
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li" active>
                                        Connectez vous
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <Form.Control name="pseudo" type="pseudo" placeholder="Saisissez votre pseudo" value={pseudo} onChange={e => setpseudo(e.target.value)}/>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                    <Form.Control name="password" type="password" placeholder="Saisissez un mot de passe" value={pass} onChange={e => setpass(e.target.value)}/>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <Button type="submit" onClick={Connect}> Connexion </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col xs={5} align='center'>
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li" variant="danger">
                                        Pas encore de compte ?
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" variant="secondary">
                                        <Link to="/NewCompte">
                                            <Button type="submit" variant="secondary"> Créer Un Compte </Button>
                                        </Link>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>                 
                    </div>
                </Container>
        </div>
    );
}

export default Connexion