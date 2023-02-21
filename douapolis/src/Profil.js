import {Container,ListGroup,Button} from "react-bootstrap";
import {useState, React} from 'react';
import Navigation from "./Navigation";

//page de profil d'un utilisateur
function Profil() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [nomUti, setnomUti] = useState(' '); 

    //fonction de changement nom Douapoli$
    async function deconneixon(){
        
    };

    //fonction de récupération des données dans la bd 

    //formulaire et titre afficher sur la page 
    return(
        <div>
            <Navigation/> 
                <Container>
                    <div class="Douapolis">
                        <center><h1 id="nom joueur">{nomUti}pseudoClaire</h1></center>
                    </div>
                    <div>
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" active className="center">
                                Statistique
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                               vous étes toujours dernier : nul
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                0 livre achetées
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                ruiné !
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div>
                        <br/>
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
                        <br/>
                        <Button type="submit" onClick={deconneixon} className='button'> Déconnexion </Button>
                    </div>
            </Container>
		 </div>
	   
    );
}

export default Profil