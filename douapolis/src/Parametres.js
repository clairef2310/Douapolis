import {Container,Button,Accordion,Form} from "react-bootstrap";
import {useState, React,useEffect} from 'react';
import { useParams, useNavigate } from "react-router";
import Navigation from "./Navigation";
import { getUser,logout,login} from "./testAuth/AuthApi";

//page de profil d'un utilisateur
export default function Profil() {
    //formulaire pour mon useEffect pour afficher le pseudo dynamiquement
    const [form, setForm] = useState({
        pseudo: "",
        mdp: "",
    });
    //formulaire qui se rempli lors du changement du mdp ou du pseudo
    const [newForm, setNewForm] = useState({
        pseudo: "",
        mdp: "",
    });
    //mes constantes et leurs setteurs appelée dans les inputs (type + remplissage avec onChange)
    const [oldPass,setOldPass] = useState('');
    const [newPass,setNewPass] = useState('');
    const [verifPass,setVerifPass] = useState('');
    const [newPseudo, setNewPseudo] = useState('');
    //constante de navigation
    const navigate = useNavigate();

    //fonction de changement de pseudo
    async function modifPseudo(event){
        const pseudo = getUser();
        const response = await fetch(`http://localhost:5000/users/${pseudo}`);
        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const users = await response.json();
        if (!users) {
            window.alert(`le compte ${pseudo} est introuvable`);
            return;
        }
        if(newPseudo !== "") { //si tout les champs sont pleins

            if(newPseudo !== users.pseudo){ //si le mdp tapé et le mdp actuel du profil sont equivalents
                const newResponse = await fetch(`http://localhost:5000/users/${newPseudo}`);
                if (!newResponse.ok) {
                    const message = `An error has occurred: ${newResponse.statusText}`;
                    window.alert(message);
                    return;
                }//je fais une requete sur le nouveau pseudo pour etre sur qu'il n'existe pas
                const newUsers = await newResponse.json();
                if (newUsers) {
                    window.alert(`le pseudo : ${newPseudo} existe deja`);
                    return;
                }//si il n'existe pas j'envoie les modifs
                else{
                    event.preventDefault();
                    newForm.pseudo = newPseudo;
                    newForm.mdp = form.mdp;
                    const modifPerson = { ...newForm };
                    await fetch(`http://localhost:5000/update/${form.pseudo}`, {
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
                    setNewForm({ pseudo: "", mdp: "" });
                    login(newPseudo);
                    navigate('/Profil');
                }
            }
            else {
                alert("Le nouveau pseudo doit etre different que l'ancien");
                return;
            }
        }
        //on affiche la bonne alerte pour que l'utilisateur corrige l'erreure 
        else{
            alert("Vous devez inscrire un pseudo");
            return;
        }
    };

    //fonction de changement de mdp
    async function modifPass(event){
        const pseudo = getUser();
        const response = await fetch(`http://localhost:5000/users/${pseudo}`);
        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const users = await response.json();
        if (!users) {
            window.alert(`Record with pseudo ${pseudo} not found`);
            return;
        }
        if(oldPass !== "" && verifPass !== "" && newPass !== "") { //si tout les champs sont pleins
            if(oldPass === users.mdp){ //si le mdp tapé et le mdp actuel du profil sont equivalents
                if(verifPass === newPass){ //si 2 les new mdp sont equivalents
                    if(newPass !== oldPass){ //si le newmdp et le old mdp sont bien differents
                        event.preventDefault();
                        newForm.pseudo = form.pseudo;
                        newForm.mdp = newPass;
                        const modifPerson = { ...newForm };
                        await fetch(`http://localhost:5000/update/${form.pseudo}`, {
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
                        setNewForm({ pseudo: "", mdp: "" });
                        navigate('/Profil');
                    }
                    else{
                        alert("Le nouveau mot de passe doit etre different du precedent");
                        return;
                    }
                }
                else{
                    alert("La verification du mot de passe ne correspond pas au nouveau mot de passe");
                    return;
                }
            }
            else{
                alert("Votre mot de passe est incorrect");
                return;
            }
        }
        //on affiche la bonne alerte pour que l'utilisateur corrige l'erreure 
        else{
            alert("Tout les champs doivent être remplis");
            return;
        }
    };

    //fonction de deconnexion
    async function deconnexion(){
      logout();
      navigate('/');
    };

    //fonction de récupération dynamique des données dans la bd afin d'afficher le pseudo
    const params = useParams();
    useEffect(() => {
        async function fetchData() {
          const pseudo = getUser();
          const response = await fetch(`http://localhost:5000/users/${pseudo}`);
      
          if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
      
          const users = await response.json();
          if (!users) {
            window.alert(`Record with pseudo ${pseudo} not found`);
            navigate("/");
            return;
          }
          setForm(users);
        }
        fetchData();
        return;
    }, [params.pseudo, navigate]);

    //formulaire et titre afficher sur la page 
    return(
        <div>
            <Navigation/> 
                <Container>
                    <div class="Douapolis">
                        <center><h1 id="nom joueur">{form.pseudo}</h1></center>
                    </div>
                    <div>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>
                                    Modifier mon Pseudo
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Form.Group>
                                        <Form.Label>Nouveau Pseudo</Form.Label>
                                        <Form.Control type={newPseudo} onChange={e => setNewPseudo(e.target.value)} placeholder="Entrez votre nouveau pseudo" />
                                        <Form.Text className="text-muted">
                                            Le nouveau pseudo ne doit pas déjà exister.
                                        </Form.Text><br/>
                                        <Button type="submit" onClick={modifPseudo} className='button'> Envoyer </Button>
                                    </Form.Group>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='1'>
                                <Accordion.Header>
                                    Modifier mon Mot de Passe
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Form.Group>
                                        <Form.Label>Ancien Mot de passe</Form.Label>
                                        <Form.Control className="mb-3" type={oldPass} onChange={e => setOldPass(e.target.value)} placeholder="Entrez votre nouveau mot de passe" />
                                        <Form.Label>Nouveau Mot de passe</Form.Label>
                                        <Form.Control className="mb-3" type={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Entrez votre nouveau mot de passe" />
                                        <Form.Label>Confirmation nouveau Mot de passe</Form.Label>
                                        <Form.Control type={verifPass} onChange={e => setVerifPass(e.target.value)} placeholder="Validez votre ancien mot de passe" />
                                        <Form.Text className="text-muted">
                                            L'ancien mot de passe doit être différent du nouveau.
                                        </Form.Text><br/>
                                        <Button type="submit" onClick={modifPass} className='button'> Envoyer </Button>
                                    </Form.Group>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div>
                        <br/>
                        <Button type="submit" onClick={deconnexion} className='button'> Déconnexion </Button>
                    </div>
            </Container>
		 </div>
	   
    );
}