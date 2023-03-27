import {Button, Container} from "react-bootstrap";
import {useState, React} from 'react';
import Navigation from "./Navigation";
import {ReactComponent as ReactLogo} from './plateau/plateau_monopoly.svg';
import trex from './images/trex.png';

//page ou l'on joue au monopoly
function Jeu() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [nomJeu, setnomJeu] = useState('DOUAPOLI$');    
    const [de1, setde1] = useState();
    const [de2, setde2] = useState();
    const [total, setTotal] = useState();
    const [variant, setVariant] = useState('primary')
    const [posx, setPosx] = useState(640);
    const [posy, setPosy] = useState(630);
    const [count, setcount] = useState(0);
    const [player, setPlayer] = useState('Joueur 1');
    const [posPion, setPosPion] = useState('Sud')

    //coordonnée case départ 
    //position x : 640
    //position y : 630

    //fonction de changement nom Douapoli$
    async function changer(){
        setnomJeu("Projet Informatique");
    };

    async function avancerPion(){
        //fonction de choix aléatoir du dé
        let de1 = Math.floor(Math.random() * (6 - 1) + 1);
        let de2 = Math.floor(Math.random() * (6 - 1) + 1);
        //total des dés
        let total = de1 + de2;
        //tableau de joueur pour faire les test avec changement de couleur pour les différencier
        let tab = ['primary','success','warning','danger'];
        let joueur = ['Joueur 1','Joueur 2','Joueur 3','Joueur 4']
        //fonction de calcul pour avancer
        let avancex = total * 62
        let avancey = total * 62

        //mise à jour des valeurs des constantes
        setde1(de1);
        setde2(de2);
        setTotal(total); 
        

        if(posx === 15 && posy === 12){
            setPosPion('Nord')
        }else if(posx === 15 && posy === 12){
            setPosPion('Est')
        }
       
        if(posPion === "Sud"){
            setPosx(posx-avancex);

        }else if(posPion === "Ouest"){
            setPosx(posx-avancey);
            
        }else if(posPion === "Nord"){
            setPosx(posx+avancex);
            
        }else if(posPion === "Est"){
            setPosx(posx+avancey);
            
        }else if(posx === 82 && posy === 630){
            setPosx(15);
            setPosy(650);
            setPosPion('Ouest')
            if(total > 1){
                avancey = (total-1) * 62
                setPosx(posx-avancey);
            }	
        }else if(posx === 635 && posy === 570){
            setPosx(640);
            setPosy(630);
            setPosPion('Sud')
            if(total > 1){
                avancey = (total-1) * 62
                setPosx(posx-avancex);
            }	
        }



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
                            <Button type="submit" variant={variant} onClick={avancerPion}>Lancer le dé</Button>
                       
                            <p className="pt-3">
                                Valeur du premier dé : {de1}<br/>
                                Valeur du deuxième dé : {de2} <br/>
                                Vous avancez de : {total}<br/>
                                C'est au joueur {player} de jouer <br/>
                                position pion : {posPion}
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