import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import "./index.css";
import { getUser } from "./testAuth/AuthApi";
import { useNavigate } from "react-router-dom";

function SalleAttente() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [host, setHost] = useState("");
  const [players, setPlayers] = useState([]);

  async function fetchPlayers() {
    const codePartie = window.location.search.substr(1);
    const response = await fetch(`http://localhost:5000/game/${codePartie}`);
    if (!response.ok) {
      const message = `An error has occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const game = await response.json();
    setCode(game.code);
    setHost(game.host);
    console.log(game);
    const nbJ = game.nbJoueurs;
    //remplissage du tableau de joueur
    if(nbJ===2){
        setPlayers([...Array(1)].map((_, i) => ({ name: game.host })));
        setPlayers([...Array(2)].map((_, i) => ({ name: `Player ${i + 2}` })));
    }
    if(nbJ===3){
        setPlayers([...Array(1)].map((_, i) => ({ name: game.host })));
        setPlayers([...Array(2)].map((_, i) => ({ name: `Player ${i + 2}` })));
        setPlayers([...Array(3)].map((_, i) => ({ name: `Player ${i + 2}` })));
    }
    if(nbJ===4){
        setPlayers([...Array(1)].map((_, i) => ({ name: game.host })));
        setPlayers([...Array(2)].map((_, i) => ({ name: `Player ${i + 2}` })));
        setPlayers([...Array(3)].map((_, i) => ({ name: `Player ${i + 2}` })));
        setPlayers([...Array(4)].map((_, i) => ({ name: `Player ${i + 2}` })));
    }

  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className="body">
      <Navigation />
      <Container>
        <div className="Douapolis">
          <center>
            <h1> Salle d'attente</h1>
          </center>
        </div>
        <div className="Centre">
          <p>Le code partie est : {code}</p>
          <p>L'hôte est : {host}</p>
          {players.map((player, index) => (
            <p key={index}>{player.name}</p>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default SalleAttente;
