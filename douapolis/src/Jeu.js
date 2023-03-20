import {Button, Container} from "react-bootstrap";
import {useState, React} from 'react';
import Navigation from "./Navigation";
import {ReactComponent as ReactLogo} from './plateau/plateau_monopoly.svg';
import trex from './images/trex.png';

//page ou l'on joue au monopoly
function Jeu() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [nomJeu, setnomJeu] = useState('DOUAPOLI$');    
    const [de1, setde1] = useState('');
    const [de2, setde2] = useState('');
    const [total, setTotal] = useState('');

    //fonction de changement nom Douapoli$
    async function changer(){
        setnomJeu("Projet Informatique");
    };

    async function nbraleatoir(){
        let de1 = Math.floor(Math.random() * (6 - 1) + 1);
        let de2 = Math.floor(Math.random() * (6 - 1) + 1);
        let total = de1 + de2;
        setde1(de1);
        setde2(de2);
        setTotal(total);   
    };


    //formulaire et titre afficher sur la page 
    return(
        <div class="entete">
        <Navigation/> 
            <Container>
                <div class="Douapolis">
                    <center><h1 id="modif" title="Cliquez moi dessus, je suis changeant !" onclick={changer}>{nomJeu}</h1></center>
                </div> 
                <div>
                    <ReactLogo/>
                    <div style={{ position: "absolute", left:"100px"}}>
                        <Button type="submit" onClick={nbraleatoir}>Lancer le dé</Button>
                        <h5 style={{ position: "absolute", left:"100px"}}>
                            Valeur du premier dé : {de1}<br/>
                            Valeur du deuxième dé : {de2} <br/>
                            Vous avancez de : {total}  
                        </h5>
                    </div>
                    
                    <img src={trex} alt="Logo" width={'100px'} height={'100px'}/>

                </div>
                
        </Container>
     </div>
    );
}

export default Jeu