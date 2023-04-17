import {Container,Form, Button,ListGroup,Row,Col} from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import {useState, React} from 'react';
import Navigation from "./Navigation";
import { login } from "./testAuth/AuthApi";
//page de création d'un nouveau compte
function NewCompte() {
    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [form, setForm] = useState({
        pseudo: "",
        mdp: "",
    });
    const[mdp2,setmdp2] = useState('')
    let navigate = useNavigate(); 
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.

    async function creationCompte(event){
        if(form.mdp !== "" && mdp2 !== "" && form.pseudo !== "") {

            const response = await fetch(`http://localhost:5000/users/${form.pseudo}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const users = await response.json();
            if (users) {
                window.alert('Ce pseudo est déja utilisé');
                return;
            }

            if(mdp2 === form.mdp){
                //alors on se redirige vers la page profil (et si on peut on affiche une alert : compte crée avec succes)
                event.preventDefault();
            
                // When a post request is sent to the create url, we'll add a new record to the database.
                const newPerson = { ...form };
                
                await fetch("http://localhost:5000/users/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newPerson),
                })
                .catch(error => {
                    window.alert(error);
                    return;
                });
                login(form.pseudo);
                setForm({ pseudo: "", mdp: "" });
                navigate(`/Profil/`);
            }
            else{
                alert("Les mots de passe ne correspondent pas")
            }
        }
        //on affiche la bonne alerte pour que l'utilisateur corrige l'erreure 
        else{
            alert("Tout les champs doivent être remplis")
        }
    };



    //formulaire et titre afficher sur la page 
    return(
        <div className="body">
            <Navigation/> 
                <Container>
                    <div className="Douapolis">
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