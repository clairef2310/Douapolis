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
    const [variant, setVariant] = useState('primary')
    const [posx, setPosx] = useState(640);
    const [posy, setPosy] = useState(60);
    const [count, setcount] = useState(0);
    const [player, setPlayer] = useState('Joueur 1');

    //fonction de changement nom Douapoli$
    async function changer(){
        setnomJeu("Projet Informatique");
    };

    async function nbraleatoir(){
        let de1 = Math.floor(Math.random() * (6 - 1) + 1);
        let de2 = Math.floor(Math.random() * (6 - 1) + 1);
        let total = de1 + de2;
        let tab = ['primary','success','warning','danger'];
        let joueur = ['Joueur 1','Joueur 2','Joueur 3','Joueur 4']
        setde1(de1);
        setde2(de2);
        setTotal(total); 
       
        if(de1 !== de2){
            if(count === 3){
                setVariant(tab[count]);
                setPlayer(joueur[count]);
                setcount(0);
            }else{
                setVariant(tab[count]);
                setPlayer(joueur[count]);
                setcount(count+1);
            }
        }
    };


    //formulaire et titre afficher sur la page 
    return(
        <div class="entete">
        <Navigation/> 
            <Container>
                <div class="Douapolis">
                    <center><h1 id="modif" title="Cliquez moi dessus, je suis changeant !" onclick={changer}>{nomJeu}</h1></center>
                </div> 
                <div className="plateau">
                    <ReactLogo/>
                        <div className="nbaleatoir">
                            <Button type="submit" variant={variant} onClick={nbraleatoir}>Lancer le dé</Button>
                       
                            <p className="pt-3">
                                Valeur du premier dé : {de1}<br/>
                                Valeur du deuxième dé : {de2} <br/>
                                Vous avancez de : {total}<br/>
                                C'est au joueur {player} de jouer
                            </p>
                        </div>     
                    <div style={{position:"absolute", left:`${posx}px`,top:`${posy}px`}}>
                        <img src={trex} alt="pion" width='10%' height='10%'/>
                    </div>
                    

                </div>
                
        </Container>
     </div>
    );
}

export default Jeu