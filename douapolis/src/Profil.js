import {Container,ListGroup,Button} from "react-bootstrap";
import {useState, React, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import Navigation from "./Navigation";
import { logout, getUser} from "./testAuth/AuthApi";

//page de profil d'un utilisateur
export default function Profil() {
    //fonction de deconnexion
    async function deconnexion(){
        logout();
        navigate('/');
    };
    //fonction de récupération des données dans la bd
    const [form, setForm] = useState({
        pseudo: "",
        mdp: "",
    });

    const [InfoJoueur, setInf] = useState({
        name: "",
        cases: "",
        achats: "",
        argents: "",
    })
     
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
            const response = await fetch(`http://localhost:5000/stats/`);
        
            if (!response.ok) {
              const message = `An error occurred: ${response.statusText}`;
              window.alert(message);
              return;
            }
        
            records = await response.json();

            let UserAlreadyRegister = false;
            let UserModified;
            for (let i = 0; i < records.length; i++) {
                if(getUser() == records[i].name){
                    UserAlreadyRegister = true;
                    UserModified = records[i];
                    break;
                }
            }

            setInf(UserModified);
          }
        
          getRecords();
      
        return;
      }, [params.pseudo, navigate]);

    function stats(){
        navigate('/AjoutStats');
    }

    function param(){
        navigate('/AjoutStats');
    }

    function AffichageStats(){
        //{InfoJoueur.cases} {InfoJoueur.achats} {InfoJoueur.argents}
        let cases = "0";
        let achats = "0";
        let argents = "0";
        if(typeof InfoJoueur != 'undefined'){
            cases = InfoJoueur.cases;
            achats = InfoJoueur.achats;
            argents = InfoJoueur.argents;
        }
        return (
            <><ListGroup.Item as="li">
                Cases parcourus : {cases}
            </ListGroup.Item><ListGroup.Item as="li">
                Nombre d'achats : {achats}
            </ListGroup.Item><ListGroup.Item as="li">
                Argents total accumulés : {argents}
            </ListGroup.Item></>
        );
      }

    function AfficherAmis(){
        return (
            <><ListGroup.Item as="li">
                Iona
            </ListGroup.Item><ListGroup.Item as="li">
                Mathis
            </ListGroup.Item><ListGroup.Item as="li">
                Romain
            </ListGroup.Item></>
        );
    }

    //formulaire et titre afficher sur la page 
    return(
        <div className="body">
            <Navigation/> 
                <Container>
                    <div className="Douapolis">
                        <center><h1 id="nom joueur">{form.pseudo}</h1></center>
                    </div>
                    <div>
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" active className="center">
                                Statistiques
                            </ListGroup.Item>
                            {AffichageStats()}
                        </ListGroup>
                    </div>
                    <div>
                        <br/>
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" active className="center">
                                Amis
                            </ListGroup.Item>
                            {AfficherAmis()}
                        </ListGroup>
                    </div>
                    <div>
                        <br/>
                        <Button type="submit" onClick={deconnexion} className='button'> Déconnexion </Button>
                        <br/>
                        <Button type="submit" onClick={stats} className='button'> Stats </Button>
                        <br/>
                        <Button type="submit" onClick={param} className='button'> Param </Button>
                    </div>
            </Container>
        </div>
    );
}