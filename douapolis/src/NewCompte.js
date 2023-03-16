import {Container,Form, Button} from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import {useState, React} from 'react';
import Navigation from "./Navigation";

//page de création d'un nouveau compte
function NewCompte() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [form, setForm] = useState({
        pseudo: "",
        email: "",
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
        if(form.email !== "" && form.mdp !== "" && mdp2 !== "" && form.pseudo !== "") {
            if(mdp2 === form.mdp){
                //si le pseudo et l'email sont unique et si le mdp est correct et similaire a la confirmation
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
                setForm({ pseudo: "", email: "", pass: "" });
                navigate(`/Profil/${newPerson.pseudo}`);
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
                                <Form.Control type="email" placeholder="Saisissez un email" value={form.email} onChange={e => updateForm({email : e.target.value})}/>
                            </Form.Label>
                            {/*le pseudo doit être unique (a gérer avec express) */}
                            <Form.Label> 
                            Pseudo
                            <br/>
                            <Form.Control type="username" placeholder="Saisissez un pseudo" value={form.pseudo} onChange={e => updateForm({pseudo : e.target.value})}/>
                            </Form.Label>
                            <Form.Label> 
                                Mot de passe 
                                <br/>
                                <Form.Control type="password" placeholder="Saisissez un mot de passe" value={form.mdp} onChange={e => updateForm({mdp : e.target.value})}/>
                            </Form.Label>
                            {/*les deux mot de passe doivent être les mêmes (peut etre fait directement dans le front) */}
                            <Form.Label> 
                                Confirmer votre mot de passe 
                                <br/>
                                <Form.Control type="password" placeholder="Saisissez un mot de passe" value={mdp2} onChange={e => setmdp2(e.target.value)}/>
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