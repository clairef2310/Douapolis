import {Button, Container} from "react-bootstrap";
import {useState, React,useEffect} from 'react';
import Navigation from "./Navigation";
import {ReactComponent as ReactLogo} from './plateau/plateau_monopoly.svg';
import trex from './images/trex.png';
import bateau from './images/bateau.png'
import chien from './images/chien.png'
import voiture from './images/voiture.png'
import { io } from "socket.io-client";
import { getUser } from "./testAuth/AuthApi";

//page ou l'on joue au monopoly
function Jeu() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [de1, setde1] = useState();
    const [de2, setde2] = useState();
    const [total, setTotal] = useState();
    const [variant, setVariant] = useState('primary')
    const [count, setcount] = useState(0);
    const [player, setPlayer] = useState('Joueur 1');
    const [ncase, setCase] = useState("Départ");
    const nomcase = ["Depart", "Nautibus", "Carte Bourse", "Astrée", "Taxe Cafèt", "Université Lyon 1", "Forel", "Carte Chance","Dubois", "Darwin","Simple Visite", "Berthollet","SSU","Thémis", "Cryo", "Gaston Berger","Jordan", "Carte Bourse", "Grignard", "Lippman","Parking Nautibus", "Géode","Carte Chance", "STAPS", "Atlas", "Insa Einstein", "Ariane", "Quai 43", "La SOIE", "Omega", "Allez en Prison", "Déambu", "Braconnier", "Carte Bourse", "Lwoff", "Insa Einstein", "Carte Chance", "Raulin", "Taxe Resto U", "Chevreul"];
    const coordx = [640,570,510,445,390,330,265,200,145,80,10,10,10,10,10,10,10,10,10,10,10,80,140,200,265,330,385,450,510,570,635,635,635,635,635,635,635,635,635,635];
    const coordy = [630, 630,630,630,630,630,630,630,630,630,645,570,500,450,380,320,260,200,140,80,10,10,10,10,10,10,10,10,10,10,10,80,140,200,260,320,380,450,510,570];
    const [posxt, setPosxt] = useState(640);
    const [posyt, setPosyt] = useState(630);
    const [posxb, setPosxb] = useState(640);
    const [posyb, setPosyb] = useState(630);
    const [posxc, setPosxc] = useState(640);
    const [posyc, setPosyc] = useState(630);
    const [posxv, setPosxv] = useState(640);
    const [posyv, setPosyv] = useState(630);
    const [indtrex, setIndtrex] = useState(0)
    const [indvoit, setIndvoit] = useState(0)
    const [indbat, setIndbat] = useState(0)
    const [indchien, setIndchien] = useState(0)
    // eslint-disable-next-line
    const [solde, setSolde] = useState(1680);

    const [code, setCode] = useState("");
    const [host, setHost] = useState("");
    const [tab, setPlayers] = useState({players: []});
    const [nbJ, setNbJ] = useState(null);
    const [nbJoueursCo, setNbJoueursCo] = useState(null);
    const [socket, setSocket] = useState(null);

    async function fetchPartie() {
        const codePartie = window.location.search.substr(1);
        const response = await fetch(`http://localhost:5000/game/${codePartie}`);
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        const game = await response.json();
        setCode(game.code);
        setHost(game.host);
        setNbJ(game.nbJoueurs);
        setNbJoueursCo(game.nbJoueursCo);
        setPlayers(game.joueursCo);
    }

  useEffect(() => {
    fetchPartie();
    if (code) {
      const socket = io("http://localhost:5000", { transports: ["websocket"] });
      setSocket(socket);
  
      socket.on("update-players", (joueurs) => {
        setPlayers(joueurs);
      });
      
      socket.emit("join-room", { roomId: code, username: getUser() }); 
      // Gestionnaire d'événements pour "join-room"

      return () => {
        socket.disconnect();
      };
    };
    // eslint-disable-next-line
  }, [code]);

    //coordonnée case départ 
    //position x : 640
    //position y : 630 

    async function avancerPion(){
       //fonction de choix aléatoir du dé
       let de1 = Math.floor(Math.random() * (6 - 1) + 1);
       let de2 = Math.floor(Math.random() * (6 - 1) + 1);
       //total des dés
       let total = de1 + de2;

        //tableau de joueur pour faire les test avec changement de couleur pour les différencier
        let tab = ['primary','success','warning','danger'];
        let joueur = ['T-rex','Bateau','Chien','Voiture']

        if(de1 !== de2){
            if(count === nbJ -1){
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

        switch(joueur[count]) {
            case 'T-rex':
                let totalindice = indtrex+total

                if(totalindice >= 39){
                    setIndtrex(totalindice-39);
                    setPosxt(coordx[indtrex]);
                    setPosyt(coordy[indtrex]);
                    setCase(nomcase[indtrex]);
                    
                }else{
                    setIndtrex(totalindice)
                    setPosxt(coordx[indtrex]);
                    setPosyt(coordy[indtrex]);
                    setCase(nomcase[indtrex]);
                }
                break;
            case 'Bateau':
                let indicebat = indbat+total

                if(indicebat >= 39){
                    setIndbat(indicebat-39);
                    setPosxb(coordx[indbat]);
                    setPosyb(coordy[indbat]);
                    setCase(nomcase[indbat]);
                    
                }else{
                    setIndbat(indicebat)
                    setPosxb(coordx[indbat]);
                    setPosyb(coordy[indbat]);
                    setCase(nomcase[indbat]);
                }
                break;
            case 'Chien':
                let indicechien = indchien+total

                if(indicechien >= 39){
                    setIndchien(indicechien-39);
                    setPosxc(coordx[indchien]);
                    setPosyc(coordy[indchien]);
                    setCase(nomcase[indchien]);
                    
                }else{
                    setIndchien(indicechien)
                    setPosxc(coordx[indchien]);
                    setPosyc(coordy[indchien]);
                    setCase(nomcase[indchien]);
                }
                break;
            case 'Voiture':
                let indicevoit = indvoit+total

                if(indicevoit >= 39){
                    setIndvoit(indicevoit-39);
                    setPosxv(coordx[indvoit]);
                    setPosyv(coordy[indvoit]);
                    setCase(nomcase[indvoit]);
                    
                }else{
                    setIndvoit(indicevoit)
                    setPosxv(coordx[indvoit]);
                    setPosyv(coordy[indvoit]);
                    setCase(nomcase[indvoit]);
                }
                break;
            default:
              return null
        
        }
        
    };

    
    //formulaire et titre afficher sur la page 
    return(
        <div className="entete">
        <Navigation/> 
            <Container>
                <div className="Douapolis">
                    <center><h1> DOUAPOLI$ </h1></center>
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
                            </p>
                        </div>     
                        <div style={{position:"absolute", left:`${posxt}px`,top:`${posyt}px`}}>
                            <img src={trex} alt="pion" width='60px' height='60px'/>
                        </div>
                        <div style={{position:"absolute", left:`${posxb}px`,top:`${posyb}px`}}>
                            <img src={bateau} alt="pion" width='60px' height='60px'/>
                        </div>
                        <div style={{position:"absolute", left:`${posxc}px`,top:`${posyc}px`}}>
                            <img src={chien} alt="pion" width='60px' height='60px'/>
                        </div>
                        <div style={{position:"absolute", left:`${posxv}px`,top:`${posyv}px`}}>
                            <img src={voiture} alt="pion" width='60px' height='60px'/>
                        </div>
                    <div className="banque">
                        <h2> Banque</h2>
                        <p>Solde de votre compte : {solde} €</p>
                    </div>
                </div>
                
        </Container>
     </div>
    );
}

export default Jeu