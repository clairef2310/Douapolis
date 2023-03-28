import {Container,Form,Button} from "react-bootstrap";
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
        <div>
            <Navigation/> 
                <Container>
                    <div class="Douapolis">
                        <center><h1> DOUAPOLI$ </h1></center>
                    </div>

                    <div class="Centre">                       
                        <div class="Connexion">                   
                            <Form.Label> 
                                pseudo <br/>
                                <Form.Control name="pseudo" type="pseudo" placeholder="Saisissez votre pseudo" value={pseudo} onChange={e => setpseudo(e.target.value)}/>
                            </Form.Label>
                            <Form.Label> 
                                Mot de passe <br/>
                                <Form.Control name="password" type="password" placeholder="Saisissez un mot de passe" value={pass} onChange={e => setpass(e.target.value)}/>
                            </Form.Label>
                            <Button type="submit" onClick={Connect}> Connexion </Button>
                        </div>
                        
                        <div class="button3">
                            <Link to="/NewCompte">
                                    <Button type="submit"> Créer un compte </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
        </div>
    );
}

export default Connexion