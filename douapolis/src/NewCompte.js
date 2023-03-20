import {Container,Form, Button} from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import {useState, React} from 'react';
import Navigation from "./Navigation";

//page de création d'un nouveau compte
function NewCompte() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [email, setemail] = useState(''); 
    const [pass, setpass] = useState(''); 
    const [pass2, setpass2] = useState(''); 
    const [pseudo, setpseudo] = useState(''); 
    let navigate = useNavigate(); 

    //fonction de lancement de partie
    async function creationCompte(event){
        event.preventDefault(); 
          if(email !== "" && pass !== "" && pass2 !== "" && pseudo !== "") {
            //si le pseudo et l'email sont unique et si le mdp est correct et similaire a la confirmation
            //alors on se redirige vers la page profil (et si on peut on affiche une alert : compte crée avec succes)
            navigate("/Profil", {replace : true});
            //sinon :
            //on affiche la bonne alerte pour que l'utilisateur corrige l'erreure
          } 
          else{
            alert("Tout les champs doivent être remplis")
          }
    };



    //formulaire et titre afficher sur la page 
    return(
        <div class="entete">
            <Navigation/> 
                <Container>
                    <div class="Douapolis">
                        <center><h1> DOUAPOLI$ </h1></center>
                    </div>

                    <div class="Centre">                       
                        <div class="Inscription">                   
                            <Form.Label> 
                                Email
                                <br/>
                                <Form.Control type="email" placeholder="Saisissez un email" value={email} onChange={e => setemail(e.target.value)}/>                              
                            </Form.Label>
                            {/*le pseudo doit être unique (a gérer avec express) */}
                            <Form.Label> 
                            Pseudo
                            <br/>
                            <Form.Control type="username" placeholder="Saisissez un pseudo" value={pseudo} onChange={e => setpseudo(e.target.value)}/>
                            </Form.Label>
                            <Form.Label> 
                                Mot de passe 
                                <br/>
                                <Form.Control type="password" placeholder="Saisissez un mot de passe" value={pass} onChange={e => setpass(e.target.value)}/>
                            </Form.Label>
                            {/*les deux mot de passe doivent être les mêmes (peut etre fait directement dans le front) */}
                            <Form.Label> 
                                Confirmer votre mot de passe 
                                <br/>
                                <Form.Control type="password" placeholder="Saisissez un mot de passe" value={pass2} onChange={e => setpass2(e.target.value)}/>
                            </Form.Label>
                        </div>
                        
                        <div class="button2">
                            <Button type="submit" onClick={creationCompte} > Valider </Button>
                        </div>
                    </div>
                </Container>
        </div>
    );
}

export default NewCompte