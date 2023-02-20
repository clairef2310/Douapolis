import {Container,Form,Button} from "react-bootstrap";
import {Navigate } from "react-router-dom";
import {useState, React} from 'react';
import Navigation from "./Navigation";

//Page de connexion de l'application
function Connexion() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [email, setemail] = useState(''); 
    const [pass, setpass] = useState(''); 
    const [nomJeu, setnomJeu] = useState('DOUAPOLI$');    

    //fonction de changement nom Douapoli$
    async function changer(){
        setnomJeu("Projet Informatique");
    };

    //envoie vers la page de création de comtpe
    async function creationCompte(event){
        event.preventDefault(); 
            <Navigate to="/NewCompte"/>
    };

     //Verification des données de connexion puis envoie à la page d'accueil
     //la fonction n'est pas encore faire
     async function Connexion (event){
        event.preventDefault(); 
            <Navigate to="/"/>
    };

    //formulaire et titre afficher sur la page 
    return(
        <div class="entete">
            <Navigation/> 
                <Container>
                    <div class="Douapolis">
                        <center><h1 id="modif" title="Cliquez moi dessus, je suis changeant !" onclick={changer}>{nomJeu}</h1></center>
                    </div> 
                    <div class="Centre">                       
                        <Form class="Partie center" name="formulaire">                   
                            <Form.Label className="input center" > 
                                Email
                                <br/>
                                <Form.Control className="input center" name="email" required  type="email" placeholder="Saisissez un email" value={email} onChange={e => setemail(e.target.value)}/>
                            </Form.Label>
                            <Form.Label className="input center" > 
                                Mot de passe 
                                <br/>
                                <Form.Control className="input center" name="password" required  type="password" placeholder="Saisissez un mot de passe" value={pass} onChange={e => setpass(e.target.value)}/>
                            </Form.Label>
                            <Button type="submit" onClick={Connexion} className='button'> Connexion </Button>
                        </Form>
                        
                        <div class="buttonJouer">
                            <Button type="submit" onClick={creationCompte} className='button'> Créer un compte </Button>
                        </div>
                    </div>
                </Container>
        </div>
    );
}

export default Connexion