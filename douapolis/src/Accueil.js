import {Form,Button, Container,InputGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState, React,useEffect,useContext} from 'react';
import Navigation from "./Navigation";
import './index.css' 
import { hasAuthenticated } from "./testAuth/AuthApi";
import { UserContext } from "./testAuth/userAuth";
import { getUser,login } from "./testAuth/AuthApi";

//page d'accueil du jeu

function Accueil() {
    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [codePartie, setcodePartie] = useState(''); 
    let navigate = useNavigate();
    //fonction de lancement de partie
    async function lancePartie(event){
        event.preventDefault();
        if(codePartie !== "") {
            const response = await fetch(`http://localhost:5000/game/${codePartie}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const game = await response.json();
            if (game) {
                var val = window.confirm("Etes-vous sur de vouloir rejoindre cette partie ?");
                if( val === true ) {

                    if(game.nbJoueursCo===game.nbJoueurs){
                        alert("Cette partie est pleine");
                    }
                    if(game.nbJoueurs.Co===null){
                        alert("Cette partie a déjà commencé");
                    }
                    else{
                        if(getUser()===null){
                            const nomGuest = generateGuest();
                            const newUser = { pseudo : nomGuest};
                            await fetch("http://localhost:5000/users/add", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(newUser),
                            })
                            .catch(error => {
                                window.alert(error);
                                return;
                            });

                            login(nomGuest);
                            navigate(`/SalleAttente?${codePartie}`, {replace : true});

                        }
                        else navigate(`/SalleAttente?${codePartie}`, {replace : true});
                    }
                }
            }
            else{
                alert("Cette partie n'existe pas");
            }
        }
        else{
            alert("Merci de rentrer un code de partie.");
        }
    };
    const [userState, setUserState] = useContext(UserContext);
    useEffect(() => {
        async function fetchData() {
            setUserState((state) => ({ ...state, userLogged: hasAuthenticated() }));
        }
        fetchData();
        return;
      }, [setUserState]);
    
    function generateGuest(){
        const char = '0123456789'
        let guest = 'Guest';
        for(let i=0;i<5;i++){
            const randChar = Math.floor(Math.random()*char.length);
            guest += char[randChar];
        }
        async function verif(){
            const response = await fetch(`http://localhost:5000/users/${guest}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const users = await response.json();
            if (users) {
                generateGuest();
            }
        }
        verif();
        return guest;
    }
    //formulaire et titre afficher sur la page 
    return(
        <div className="body">
            <Navigation/>
            <Container>
                <div className="Douapolis">
                    <center><h1> DOUAPOLI$ </h1></center>
                </div>
                {/*ici on devra modifier le bouton connexion si la personne est deja connectee, en un bouton creation de partie*/}
                <div className="Centre"> 
                    {(userState.userLogged===false && (
                        <Form.Label>
                            <Link to="/Connexion">
                                <div className="button1">
                                    <Button size="lg" type="submit"> Connexion </Button>
                                </div>
                            </Link>
                        </Form.Label>
                    )) || (
                        <Form.Label>
                            <Link to="/NewJeu">
                                <div className="button1">
                                    <Button size="lg" type="submit" > Créer ma Partie </Button>
                                </div>
                            </Link>
                        </Form.Label>
                    )}
                    <div className="rejPartie">
                        <InputGroup size="lg">
                            <Button variant="primary" id="lg" disabled>Rejoindre une partie </Button>
                            <Form.Control name="codePartie" type="text" align="center" placeholder="CODE PARTIE" 
                                value={codePartie} onChange={e => setcodePartie(e.target.value)}
                            />
                            <Button size="lg" type="submit" onClick={lancePartie}> Jouer </Button>
                        </InputGroup>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Accueil