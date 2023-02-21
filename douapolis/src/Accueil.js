import {Form,Button, Container,} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";
import {useState, React} from 'react';
import Navigation from "./Navigation";
import './index.css' 

//page d'accueil du jeu
function Accueil() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [codePartie, setcodePartie] = useState(''); 

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

    //formulaire et titre afficher sur la page 
    return(
        <div>
            <Navigation/>
                <Container>
                    <div class="Douapolis">
                        <center><h1> DOUAPOLI$ </h1></center>
                    </div>
                    
                    <div class="Centre">
                        <Form.Label>
                            <Link to="./Connexion">
                                <div class="button1">
                                    <Button type="submit"> Connexion </Button>
                                </div>
                            </Link>
                        </Form.Label>
                        
                        <div class="Partie">
                            <p align="center"><br></br>Rejoindre une partie</p>
                            <Form.Control name="codePartie" required  type="text" align="center" placeholder="CODE PARTIE" value={codePartie} onChange={e => setcodePartie(e.target.value)}/>
                        </div>
                        
                        <div class="button2">
                            <Button type="submit" onClick={lancePartie}> Jouer </Button>
                        </div>
                    </div>
                </Container>
        </div>
    );
}

export default Accueil