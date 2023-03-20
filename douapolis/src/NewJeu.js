import {Container,Form, Button} from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import {useState, React} from 'react';
import Navigation from "./Navigation";

//page de création d'une nouvelle partie
function NewPartie() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [form, setForm] = useState({
        nbJoueurs: "",
        priv: "",
        speed: "",
    });

    let navigate = useNavigate(); 
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    // This function will handle the submission.

    async function creationPartie(event){
        event.preventDefault();

        const newGame = { ...form };
                
        await fetch("http://localhost:5000/game/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGame),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        setForm({ nbJoueurs: "", priv: "", speed: "" });
        navigate("/Jeu", {replace : true});
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
                                Nombre joueurs
                                <br/>
                                <Form.Select class="form-select" aria-label="Default select example" value={form.nbJoueurs} onChange={e => updateForm({nbJoueurs: e.target.value})}>
                                    <option selected>Choisissez</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </Form.Select>
                            </Form.Label>
                            <br/>
                            <Form.Label> 
                                Partie privée ?
                                <br/>
                                <Form.Select class="form-select" aria-label="Default select example" value={form.priv} onChange={e => updateForm({priv: e.target.value})}>
                                    <option selected>Ici aussi</option>
                                    <option value="private">Privée</option>
                                    <option value="public">Publique</option>
                                </Form.Select>
                            </Form.Label>
                            <br/>
                            <Form.Label> 
                                Vitesse de jeu
                                <br/>
                                <select class="form-select" aria-label="Default select example" value={form.speed} onChange={e => updateForm({speed: e.target.value})}>
                                    <option selected>Encore là</option>
                                    <option value="normal">Normale</option>
                                    <option value="fast">Rapide</option>
                                </select>
                            </Form.Label>
                        </div>
                        
                        <div class="button2">
                            <Button type="submit" onClick={creationPartie} > Valider </Button>
                        </div>
                    </div>
                </Container>
        </div>
    );
}

export default NewPartie