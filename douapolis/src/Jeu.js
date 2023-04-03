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
    const [count, setcount] = useState(0);
    const [player, setPlayer] = useState('Joueur 1');
    const [posx, setPosx] = useState(640);
    const [posy, setPosy] = useState(630);
    const [ncase, setCase] = useState("Départ");
    const nomcase = ["Depart", "Nautibus", "Carte Bourse", "Astrée", "Taxe Cafèt", "Université Lyon 1", "Florel", "Carte Chance","Dubois", "Darwin","Simple Visite", "Berthollet","SSU","Thémis", "Cryo", "Gaston Berger","Jordan", "Carte Bourse", "Grignard", "Lippman","Parking Nautibus", "Géode","Carte Chance", "STAPS", "Atlas", "Insa Einstein", "Ariane", "Quai 43", "La SOIE", "Omega", "Allez en Prison", "Déambu", "Braconnier", "Carte Bourse", "Lwoff", "Insa Einstein", "Carte Chance", "Raulin", "Taxe Resto U", "Chevreul"];
    const coordx = [640,570,510,445,390,330,265,200,145,80,10,10,10,10,10,10,10,10,10,10,80,140,200,265,330,385,450,510,570,635,635,635,635,635,635,635,635,635];
    const coordy = [630, 630,630,630,630,630,630,630,630,630,645,570,500,450,380,320,260,200,140,80,10,10,10,10,10,10,10,10,10,10,10,80,140,200,260,320,380,450,510,570];;
    const [indice, setIndice] = useState(0)

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

        //mise à jour des valeurs des constantes
        setde1(de1);
        setde2(de2);
        setTotal(total); 

        setIndice(indice+total);
        if(indice >= nomcase.length -1){
            setIndice(nomcase.length-indice);
        }
        setPosx(coordx[indice]);
        setPosy(coordy[indice]);
        setCase(nomcase[indice]);
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
                                Vous êtes sur la case : {ncase} <br/>
                                coordonnée de x : {posx}<br/>
                                coordonnéede y : {posy}<br/>
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
