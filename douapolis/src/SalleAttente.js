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
        const codePartie = window.location.search.substr(1);
        const response = await fetch(`http://localhost:5000/game/${codePartie}`);
        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const rep = await response.json();
        setHost(rep.host);
        setCode(rep.code);
        if (getUser()===rep.host) {
            return(
                console.log("Je suis l'hote")
            );
        }
        else{
            return(
                console.log("Je suis un simple joueur")
            );
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
                    <p>Joueur(s) : {getUser()}</p>
                </div>
            </Container>
        </div>
    );
}

export default SalleAttente