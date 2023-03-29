import {Container,Button} from "react-bootstrap";
import {useState, React,useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import Navigation from "./Navigation";
import { getUser,logout } from "./testAuth/AuthApi";

//page de profil d'un utilisateur
export default function Profil() {
    //fonction de changement nom Douapoli$
    
    //fonction de deconnexion
    async function deconnexion(){
      logout();
      navigate('/');
  };
    //fonction de récupération des données dans la bd
    const [form, setForm] = useState({
        pseudo: "",
        email: "",
        mdp: "",
    });
     
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
                       <p>page de parametre</p>
                    </div>
                    <div>
                        <br/>
                        <Button type="submit" onClick={deconnexion} className='button'> Déconnexion </Button>
                    </div>
            </Container>
		 </div>
	   
    );
}