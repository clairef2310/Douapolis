import {Container,ListGroup,Button} from "react-bootstrap";
import {useState, React, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import Navigation from "./Navigation";
import { logout, getUser} from "./testAuth/AuthApi";
import { Link } from "react-router-dom";

export default function GestionAmis() {

    async function deconnexion(){
        logout();
        navigate('/');
    };
    //fonction de récupération des données dans la bd
    const [form, setForm] = useState({
        pseudo: "",
        mdp: "",
    });

    const [formDemande, setFormDemande] = useState({
        name: "",
    });

    const [formAmis, setFormAmis] = useState({
        name: "",
        listAmis: "",
        demandeAmis :"",
      });

      function updateFormAmis(value) {
        return setFormAmis((prev) => {
          return { ...prev, ...value };
        });
    }

    function updateFormDemandeAmis(value) {
        return setFormDemande((prev) => {
          return { ...prev, ...value };
        });
    }

    const params = useParams();
    const navigate = useNavigate();
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

        let records;

        async function getRecords() {
            const response = await fetch(`http://localhost:5000/amis/`);

            if(!response.ok){
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            records = await response.json();

            for(let i = 0; i < records.length; i++){
                if(getUser() === records[i].name){
                    setFormAmis(records[i])
                }
            }
            
        }

        getRecords();
      
        return;
      }, [params.pseudo, navigate]);

      function AffichageAmis(){
        
        let res = (
            <><ListGroup.Item as="li">
                Aucun Amis
            </ListGroup.Item></>
        );

        if(formAmis.listAmis != "") {
            return (
                <>
                {formAmis.listAmis.map((index) => (
                    <ListGroup.Item as="li" key={index}>
                        {index}
                    </ListGroup.Item>
                ))
                }
                </>
              );
        }
        return res;
      }

      function AffichageDemande(){
        let res = (
            <><ListGroup.Item as="li">
                Aucune demande d'amis
            </ListGroup.Item></>
        )
        if(formAmis.demandeAmis != "") {
            return (
                <>
                {formAmis.demandeAmis.map((index) => (
                    <ListGroup.Item as="li" key={index}>
                        {index}
                    </ListGroup.Item>
                ))
                }
                </>
              );
        }
        return res;
      }

    async function DemandeAjout(event){
        console.log(formDemande.name);
        for(const ami in formAmis.listAmis){
            if(formAmis.listAmis[ami] == formDemande.name){
                window.alert("Déjà ami avec cette personne");
                return;
            } 
        }

        const response = await fetch(`http://localhost:5000/amis/`);

            if(!response.ok){
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

        let records = await response.json();

        let user2;

        for(let i = 0; i < records.length; i++){
            if(formDemande.name === records[i].name){
                user2 = records[i];
            }
        }

        if(user2 == undefined) {
            window.alert("utilisateur inexistant");
            return;
        }

        console.log(user2);

        for(const ami in formAmis.demandeAmis){
            if(formAmis.demandeAmis[ami] == formDemande.name){
                const edited1 = {
                    name: user2.name,
                    listAmis: user2.listAmis,
                    demandeAmis : user2.demandeAmis,
                }
                edited1.listAmis.push(getUser());
                const edited2 = {
                    name: getUser(),
                    listAmis: formAmis.listAmis,
                    demandeAmis : formAmis.demandeAmis,
                }
                edited2.listAmis.push(user2.name);
                for(let i=0; i<edited2.demandeAmis.length;i++){
                    if(edited2.demandeAmis[i]==user2.name){
                        delete edited2.demandeAmis[i];
                    }
                }
                await fetch(`http://localhost:5000/updateAmis/${user2.name}`, {
                method: "POST",
                body: JSON.stringify(edited1),
                headers: {
                'Content-Type': 'application/json'
                },
            });
                await fetch(`http://localhost:5000/updateAmis/${getUser()}`, {
                method: "POST",
                body: JSON.stringify(edited2),
                headers: {
                  'Content-Type': 'application/json'
                },
              });
                return;
            } 
        }

        const edited = {
            name: user2.name,
            listAmis: user2.listAmis,
            demandeAmis : user2.demandeAmis,
        }
        edited.demandeAmis.push(getUser());

        console.log(edited);

        await fetch(`http://localhost:5000/updateAmis/${user2.name}`, {
        method: "POST",
        body: JSON.stringify(edited),
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }

    function AjouterAmis(){
        return (
            <><ListGroup.Item as="li">
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={formDemande.name}
                        onChange={(e) => updateFormDemandeAmis({ name: e.target.value })}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <button
                            onClick={DemandeAjout}
                            type="submit"
                            id = "nomDem"
                            value="Send stats"
                            className="btn btn-primary"
                        >Envoyer Demande</button>
                    </div>
            </ListGroup.Item></>
        );
      }

    // This following section will display the form that takes the input from the user.
    return (
        <div className="body">
            <Navigation/>
            <Container>
                <div className="Douapolis">
                    <center><h1 id="nom joueur">{form.pseudo}</h1></center>
                </div>
                    <div>
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" active className="center">
                                Liste d'amis
                            </ListGroup.Item>
                            {AffichageAmis()}
                        </ListGroup>
                    </div>
                    <br></br>
                    <div>
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" active className="center">
                                Demande d'amis
                            </ListGroup.Item>
                            {AffichageDemande()}
                        </ListGroup>
                    </div>
                    <br></br>
                    <div>
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" active className="center">
                                Ajouter des amis
                            </ListGroup.Item>
                            {AjouterAmis()}
                        </ListGroup>
                    </div>
            </Container>
        </div>
    );
}

