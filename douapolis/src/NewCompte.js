import {Container,Form, Button} from "react-bootstrap";
import {Navigate } from "react-router-dom";
import {useState, React} from 'react';
import Navigation from "./Navigation";

//page de création d'un nouveau compte
function NewCompte() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [email, setemail] = useState(''); 
    const [pass, setpass] = useState(''); 
    const [pass2, setpass2] = useState(''); 
    const [pseudo, setpseudo] = useState(''); 
    const [nomJeu, setnomJeu] = useState('DOUAPOLI$');    

    //fonction de changement nom Douapoli$
    async function changer(){
        setnomJeu("Projet Informatique");
    };

    //fonction de lancement de partie
    async function creationCompte(event){
        event.preventDefault(); 
  
          if(email !== "") {
              alert("le champ email doit être saisi")
          } 
          else{
              <Navigate to ="/Jeu"/>
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
                    <div class="Centre">                       
                        <Form class="Partie center" name="formulaire">                   
                            <Form.Label className="input center" > 
                                Email
                                <br/>
                                <Form.Control className="input center" name="email" required  type="email" placeholder="Saisissez un email" value={email} onChange={e => setemail(e.target.value)}/>
                            </Form.Label>
                            <Form.Label className="input center" > 
                                Mot de passe 
                                <br/>
                                <Form.Control className="input center" name="password" required  type="password" placeholder="Saisissez un mot de passe" value={pass} onChange={e => setpass(e.target.value)}/>
                            </Form.Label>
                            {/*les deux mot de passe doivent être les mêmes (peut etre fait directement dans le front) */}
                            <Form.Label className="input center" > 
                                Confirmer votre mot de passe 
                                <br/>
                                <Form.Control className="input center" name="password" required  type="password" placeholder="Saisissez un mot de passe" value={pass2} onChange={e => setpass2(e.target.value)}/>
                            </Form.Label>
                             {/*le pseudo doit être unique (a gérer avec express) */}
                            <Form.Label className="input center" > 
                                Pseudo
                                <br/>
                                <Form.Control className="input center" name="password" required  type="password" placeholder="Saisissez un mot de passe" value={pseudo} onChange={e => setpseudo(e.target.value)}/>
                            </Form.Label>
                        </Form>
                        
                        <div class="buttonJouer">
                            <Button type="submit" onClick={creationCompte} className='button'> Valider </Button>
                        </div>
                    </div>
                </Container>
        </div>
    );
}

export default NewCompte