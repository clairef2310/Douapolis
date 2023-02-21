import {Container,Form,Button} from "react-bootstrap";
import {Navigate,Link} from "react-router-dom";
import {useState, React} from 'react';
import Navigation from "./Navigation";

//Page de connexion de l'application
function Connexion() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [email, setemail] = useState(''); 
    const [pass, setpass] = useState(''); 

     //Verification des données de connexion puis envoie à la page d'accueil
     //la fonction n'est pas encore faire
     async function Connexion (event){
        event.preventDefault(); 
            <Navigate to="./Profil"/>
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
                                Email <br/>
                                <Form.Control name="email" required  type="email" placeholder="Saisissez un email" value={email} onChange={e => setemail(e.target.value)}/>
                            </Form.Label>
                            <Form.Label> 
                                Mot de passe <br/>
                                <Form.Control name="password" required  type="password" placeholder="Saisissez un mot de passe" value={pass} onChange={e => setpass(e.target.value)}/>
                            </Form.Label>
                            <Button type="submit" onClick={Connexion}> Connexion </Button>
                        </div>
                        
                        <div class="button3">
                            <Link to="./NewCompte">
                                    <Button type="submit"> Créer un compte </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
        </div>
    );
}

export default Connexion