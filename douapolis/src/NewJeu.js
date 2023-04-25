import {Container,Form, Button,ListGroup,Row,Col} from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import {useState, React} from 'react';
import Navigation from "./Navigation";
import { getUser } from "./testAuth/AuthApi";
//page de création d'une nouvelle partie
function NewPartie() {

    //Variable permettant de récupérer et utiliser les données lors d'un changement d'état
    const [form, setForm] = useState({
        nbJoueurs: 0,
        code : "",
        host : "",
        nbJoueursCo: 0,
    });

    const [user, setUser] = useState({
        pseudo: "",
        mdp: "",
        myGame: "",
    });

    let navigate = useNavigate(); 
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    // This function will handle the submission.

    async function creationPartie(event){
        if(form.nbJoueurs !== ''){
            event.preventDefault();
            await fetch(`http://localhost:5000/gameDel/${getUser()}`, {
                method: 'DELETE',
            });
            const codePartie = generateCode();
            form.code = codePartie;
            form.host = getUser();
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
            //Ici je remplis le champ myGame dans l'users de l'hote
            const response = await fetch(`http://localhost:5000/users/${form.host}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const users = await response.json();
            if (!users) {
                window.alert(`Record with pseudo ${form.host} not found`);
                return;
            }
            user.pseudo = users.pseudo;
            user.mdp = users.mdp;
            user.myGame = form.code;
            const modifPerson = { ...user };
            await fetch(`http://localhost:5000/update/${form.host}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(modifPerson),
            })
            .catch(error => {
                window.alert(error);
                return;
            });
            setUser({pseudo : "", mdp : "", myGame : ""});
            setForm({ nbJoueurs: 0, code : "", host : "", nbJoueursCo: 0});
            navigate(`/SalleAttente?${codePartie}`, {replace : true});
        }
        else{
            window.alert("veuillez remplir tout les champs");
        }
    };

    function generateCode(){
        const char = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let code = '';
        for(let i=0;i<4;i++){
            const randChar = Math.floor(Math.random()*char.length);
            code += char[randChar];
        }
        async function verif(){
            const response = await fetch(`http://localhost:5000/game/${code}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const game = await response.json();
            if (game) {
                generateCode();
            }              
        }
        verif();
        return code;
    }

    //formulaire et titre afficher sur la page 
    return(
        <div className="body">
            <Navigation/>
            <Container>
                    <div className="Douapolis">
                        <center><h1> DOUAPOLI$ </h1></center>
                    </div>
                    <div className="Centre">                       
                        <Row className="row h-100 justify-content-center align-items-center">
                            <Col xs={5} align='center'>
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li" active>
                                        Créer une Nouvelle Partie
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        Nombre joueurs :
                                        <Form.Select className="form-select" aria-label="Default select example" value={form.nbJoueurs} onChange={e => updateForm({nbJoueurs: parseInt(e.target.value)})}>
                                            <option>Choisissez</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </Form.Select>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <Button type="submit" onClick={creationPartie} > Valider </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>                  
                    </div>
                </Container>
        </div>
    );
}

export default NewPartie