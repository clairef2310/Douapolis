import {Container,ListGroup,Button} from "react-bootstrap";
import {useState, React} from 'react';
import Navigation from "./Navigation";

//page de profil d'un utilisateur
function Profil() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [nomUti, setnomUti] = useState(' ');
    const [nomJeu, setnomJeu] = useState('DOUAPOLI$');    

    //fonction de changement nom Douapoli$
    async function changer(){
        setnomJeu("Projet Informatique");
    };

    //fonction de changement nom Douapoli$
    async function deconneixon(){
        
    };

    //fonction de récupération des données dans la bd 

    //formulaire et titre afficher sur la page 
    return(
        <div class="entete">
            <Navigation/> 
                <Container>
                    <div class="Douapolis">
                        <center><h1 id="modif" title="Cliquez moi dessus, je suis changeant !" onclick={changer}>{nomJeu}</h1></center>
                    </div> 
                    <div class="Douapolis">
                        <center><h1 id="nom joueur">{nomUti}</h1></center>
                    </div>
                    <div>
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" active className="center">
                                Statistique
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                               test
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                test
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                test
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div>
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" active className="center">
                                Amis
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                               Iona
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                Mathis
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                Romain
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div>
                        <Button type="submit" onClick={deconneixon} className='button'> Déconnexion </Button>
                    </div>
            </Container>
		 </div>
	   
    );
}

export default Profil