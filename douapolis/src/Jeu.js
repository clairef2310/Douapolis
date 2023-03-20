import {Container} from "react-bootstrap";
import {useState, React} from 'react';
import Navigation from "./Navigation";

//page ou l'on joue au monopoly
function Jeu() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [nomJeu, setnomJeu] = useState('DOUAPOLI$');    

    //fonction de changement nom Douapoli$
    async function changer(){
        setnomJeu("Projet Informatique");
    };

    //formulaire et titre afficher sur la page 
    return(
        <div class="entete">
        <Navigation/> 
            <Container>
                <div class="Douapolis">
                    <center><h1 id="modif" title="Cliquez moi dessus, je suis changeant !" onclick={changer}>{nomJeu}</h1></center>
                </div> 
        </Container>
     </div>
    );
}

export default Jeu