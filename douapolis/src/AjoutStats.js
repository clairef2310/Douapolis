import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {Button} from "react-bootstrap";
import { getUser } from "./testAuth/AuthApi";

export default function AjoutStats() {

    const [form, setForm] = useState({
      name: getUser(),
      cases: entierAleatoire(0,100).toString(),
      achats: entierAleatoire(0,100).toString(),
      argents: entierAleatoire(0,100).toString(),
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }

    //fonction de modif des stats
    async function modifStats(event){
        event.preventDefault();
        const response = await fetch(`http://localhost:5000/stats/`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const records = await response.json();
        
        const newPerson = { ...form };
   
      let UserAlreadyRegister = false;
      let UserModified;
     for (let i = 0; i < records.length; i++) {
       if(form.name === records[i].name){
         UserAlreadyRegister = true;
         UserModified = records[i];
         break;
       }
     }
     console.log(UserModified);

     if(!UserAlreadyRegister){
      await fetch("http://localhost:5000/stats/add", {
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
    
      setForm({ name: "", cases: "", achats: "", argents: "" });
      retourProfil();
     } else {
      const editedPerson = {
        name: form.name,
        cases: (parseInt(form.cases) + parseInt(UserModified.cases)).toString(),
        achats: (parseInt(form.achats) + parseInt(UserModified.achats)).toString(),
        argents: (parseInt(form.argents) + parseInt(UserModified.argents)).toString(),
      };
      console.log(editedPerson);

      await fetch(`http://localhost:5000/updateStats/${UserModified.name}`, {
        method: "POST",
        body: JSON.stringify(editedPerson),
        headers: {
          'Content-Type': 'application/json'
        },
      });
     }
     retourProfil();
    };
    function retourProfil(){
        navigate('/Profil');
    }

    function entierAleatoire(min, max)
    {
     return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // This following section will display the form that takes the input from the user.
    return (
      <div>
        <h3>Create New Record</h3>
        <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cases">cases</label>
            <input
              type="number"
              className="form-control"
              id="cases"
              value={form.cases}
              onChange={(e) => updateForm({ cases: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="achats">Achats</label>
            <input
              type="number"
              className="form-control"
              id="achats"
              value={form.achats}
              onChange={(e) => updateForm({ achats: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="argents">Argents</label>
            <input
              type="number"
              className="form-control"
              id="argents"
              value={form.argents}
              onChange={(e) => updateForm({ argents: e.target.value })}
            />
          </div>
          <div className="form-group">
            <button
                onClick={modifStats}
              type="submit"
              value="Send stats"
              className="btn btn-primary"
            >envoi</button>
          </div>

< Button type="submit" onClick={retourProfil} className='button'> Retourner profil </Button>
      </div>
      
    );
}

