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

    //constante pour la gestion d'erreur
    const [errorP, setErrorP] = useState('');
    const [errorE, setErrorE] = useState('');
    const [errorPwd, setErrorPwd] = useState('');
    const [errorPwd2, setErrorPwd2] = useState('');
    let Globalerror = false
    let Vide = false

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

  //fonction qui permet de vérifier que les input ne sont pas vides
  async function inputVide(){
    let tab = []
    let error= []
    tab[0]=email
    tab[1]=pseudo
    tab[2]=pass
    tab[3]=pass2
    for(let i=0;i<tab.length;i++){
       error[i] =(!InputVide.test(tab[i]))
       if (error[i]===true) Vide  = true
    }
    if (error[0]) setErrorE("L'email doit être renseigné et doit contenir plus de 3 caractères")
    if (error[1]) setErrorP("Le nom doit être renseigné et doit contenir plus de 3 caractères")
    if (error[2]) setErrorPwd("Le prénom doit être renseigné et doit contenir plus de 3 caractères")
    if (error[3]) setErrorPwd2("Le mot de passe doit être renseigné et doit contenir plus de 3 caractères")
    return Vide 
  }

   //fonction appelée à la validation de l'utilisateur
    async function transportdata(event){

        setErrorE("")
        setErrorP("")
        setErrorPwd("")
        setErrorPwd2("")
        event.preventDefault();
        

        //vérification des données saisies
          if(await inputVide() === false){
            if (!Globalerror){
                    alert("Le dossier a bien été enregistré")
                    navigate("/Admin/PageProcessUti", { replace: true });
            }
                
            }else{
            alert("Tous les champs doivent être renseignés")
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
                                {(errorE !=="") ? (<div className="error">{errorE}</div> ) :"" }
                            </Form.Label>
                            {/*le pseudo doit être unique (a gérer avec express) */}
                            <Form.Label> 
                            Pseudo
                            <br/>
                            <Form.Control type="username" placeholder="Saisissez un pseudo" value={pseudo} onChange={e => setpseudo(e.target.value)}/>
                            {(errorP !=="") ? (<div className="error">{errorP}</div> ) :"" }
                            </Form.Label>
                            <Form.Label> 
                                Mot de passe 
                                <br/>
                                <Form.Control type="password" placeholder="Saisissez un mot de passe" value={pass} onChange={e => setpass(e.target.value)}/>
                            </Form.Label>
                            {(errorPwd !=="") ? (<div className="error">{errorPwd}</div> ) :"" }
                            {/*les deux mot de passe doivent être les mêmes (peut etre fait directement dans le front) */}
                            <Form.Label> 
                                Confirmer votre mot de passe 
                                <br/>
                                <Form.Control type="password" placeholder="Saisissez un mot de passe" value={pass2} onChange={e => setpass2(e.target.value)}/>
                                {(errorPwd2 !=="") ? (<div className="error">{errorPwd2}</div> ) :"" }
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