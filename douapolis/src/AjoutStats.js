import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {Button} from "react-bootstrap";
import { getUser } from "./testAuth/AuthApi";

export default function AjoutStats() {

    const [form, setForm] = useState({
      name: "6",
      cases: "",
      achats: "",
      argents: "",
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
        const modif = { ...form };
        console.log(form.name); 
        console.log(modif);
        await fetch(`http://localhost:5000/updateStats/${form.name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(modif),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        setForm({ name: "6",cases: "",achats: "",argents: "", });
    };
    function retourProfil(){
        navigate('/Profil');
    }
    // This following section will display the form that takes the input from the user.
    return (
      <div>
        <h3>Create New Record</h3>
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

