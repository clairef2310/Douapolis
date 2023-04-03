import {Container} from "react-bootstrap";
import {useState, React} from 'react';
import Navigation from "./Navigation";
import './index.css' 
import { getUser } from "./testAuth/AuthApi";
//page d'accueil du jeu

function SalleAttente() {
    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [code, setCode] = useState('');
    const [host, setHost] = useState('');
    async function getCode(){
        const user = getUser();
        const response = await fetch(`http://localhost:5000/users/${user}`);
        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const rep = await response.json();
        if (rep && rep.games!==null) {
            setHost(rep.pseudo);
            setCode(rep.myGame);
            return(
                console.log("Je suis l'hote")
            )
        }
        else{
            return(
                console.log("Je un simple joueur")
            )
        }
    }
    getCode();

    //formulaire et titre afficher sur la page 
    return(
        <div className="body">
            <Navigation/>
            <Container>
                <div className="Douapolis">
                    <center><h1> Salle d'attente</h1></center>
                </div>
                {/*ici on devra modifier le bouton connexion si la personne est deja connectee, en un bouton creation de partie*/}
                <div className="Centre">
                    <p>Le code partie est : {code}</p>
                    <p>L'hôte est : {host}</p>
                </div>
            </Container>
        </div>
    );
}

export default SalleAttente