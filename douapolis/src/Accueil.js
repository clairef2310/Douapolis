import {Form,Button, Container,} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";
import {useState, React} from 'react';
import Navigation from "./Navigation";
import './index.css' 

//page d'accueil du jeu
function Accueil() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [codePartie, setcodePartie] = useState(''); 
    const [nomJeu, setnomJeu] = useState('DOUAPOLI$');    

    //fonction de lancement de partie
    async function lancePartie(event){
      event.preventDefault(); 

        if(codePartie !== "") {
            var val = window.confirm("Etes-vous sur de vouloir rejoindre cette partie ?");
            if( val === true ) {
                <Navigate to='/Jeu'/>
            } 
        } 
        else{
            alert("Merci de rentrer un code de partie.");
        }
    };

    //fonction de changement nom Douapoli$
    async function changer(){
        setnomJeu("Projet Informatique");
    };

    //formulaire et titre afficher sur la page 
    return(
        <Container>
            <div>
             <Navigation />
                    {/*ne fonctionne pas */}
                    <div class="Douapolis">
                        <center><h1 id="modif" title="Cliquez moi dessus, je suis changeant !" onclick={changer}>{nomJeu}</h1></center>
                    </div>
                
                <div class="Centre">
                    <Form class="buttonConnexion center">
                        <Link to="/Connexion">
                            <Button className="button" type="submit" onClick={lancePartie}> Connexion </Button>
                        </Link>
                    </Form>
                    
                    <Form class="Partie center" name="formulaire">                   
                        <Form.Label className="input center" > 
                            Rejoindre une partie
                            <br/>
                            <Form.Control className="input center" name="codePartie" required  type="text" placeholder="CODE PARTIE" value={codePartie} onChange={e => setcodePartie(e.target.value)}/>
                        </Form.Label>
                    </Form>
                    
                    <div class="buttonJouer">
                        <Button type="submit" onClick={lancePartie} className='button'> Joueur </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Accueil