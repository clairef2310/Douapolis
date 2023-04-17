import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import "./index.css";
import { getUser } from "./testAuth/AuthApi";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

function SalleAttente() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [host, setHost] = useState("");
  // eslint-disable-next-line
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState({players: []});
  const [nbJ, setNbJ] = useState(null);

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
    setNbJ(game.nbJoueurs);
  }

  useEffect(() => {
    fetchPlayers();
    // Connexion à socket.io
    const socket = io("http://localhost:5000", { transports: ["websocket"] });
    setSocket(socket);

    socket.on("update-players", (joueurs) => {
      console.log('Received updated player list:', joueurs);
      setPlayers(joueurs);
      // Mettre à jour l'affichage des joueurs connectés
      joueursCo();
    });

    socket.emit("join-room", { roomId: code, username: getUser() });

    return () => {
      socket.emit("leave-room", { roomId: code, username: getUser() });
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [code]);

  function startGame() {
    navigate(`/Jeu?${code}`, {replace : true});
  }

  function joueursCo() {
    if (players.players.length === 0) {
      return <p>Aucun joueur connecté.</p>;
    }
  
    const nb = nbJ;
  
    if (nb === 2) {
      return (
        <div>
          <p>Joueur 1 : {players.players[0]}</p>
          <p>Joueur 2 : {players.players[1]}</p>
        </div>
      );
    }
    if (nb === 3) {
      return (
        <div>
          <p>Joueur 1 : {players.players[0]}</p>
          <p>Joueur 2 : {players.players[1]}</p>
          <p>Joueur 3 : {players.players[2]}</p>
        </div>
      );
    }
    if (nb === 4) {
      return (
        <div>
          <p>Joueur 1 : {players.players[0]}</p>
          <p>Joueur 2 : {players.players[1]}</p>
          <p>Joueur 3 : {players.players[2]}</p>
          <p>Joueur 4 : {players.players[3]}</p>
        </div>
      );
    }
  }
  
  function partiePleine() {
    if (players.players.length === nbJ) {
      if(getUser() === host){
        return (
          <div>
            <p>La Partie est complete.</p>;
            <button onClick={startGame}>Commencer la partie</button>
          </div>
        )
      }
      else {
        return (
          <div>
            <p>La Partie est complete.</p>;
            <p>Nous attendons que l'hote lance.</p>;
          </div>
        )
      }
    }
    else {
      return (
        <div>
          <p>Nous attendons la partie soit pleine.</p>
        </div>
      )
    }
  }

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
          {joueursCo()}
          {partiePleine()}
        </div>
      </Container>
    </div>
  );
}

export default SalleAttente;
