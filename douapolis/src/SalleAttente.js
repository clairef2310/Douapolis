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
  const [socket, setSocket] = useState(null);
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
    const nbJ = game.nbJoueurs;
    //setPlayers(game.joueurs);
    /*
    if (game.nbJoueurs >= nbJ) {
      window.alert("La partie est pleine.");
      navigate("/");
    }
    */
  }

  useEffect(() => {
    fetchPlayers();

    // Connexion à socket.io
    const socket = io("http://localhost:5000", { transports: ["websocket"] });
    setSocket(socket);

    socket.on("update-players", (joueurs) => {
      console.log('Received updated player list:', joueurs);
      setPlayers(joueurs);
      console.log(players);
    });

    socket.emit("join-room", { roomId: code, username: getUser() });

    return () => {
      socket.emit("leave-room", { roomId: code, username: getUser() });
      socket.disconnect();
    };
  }, [code]);

  function startGame() {
    socket.emit("start-game", code);
  }

  function joueursCo() {
    return (
      <div>
        <p>Joueurs</p>
      </div>
    );
  }
/*<p> Joueur 1 : {players.players[0]}
        <br/>Joueur 2 : {players.players[1]}
        <br/>Joueur 3 : {players.players[2]}
        <br/>Joueur 4 : {players.players[3]}</p>*/
  return (
    <div className="body">
      <Navigation />
      <Container>
        <div className="Douapolis">
          <center>
            <h1> Salle d'attente</h1>
            <button onClick={startGame}>Commencer la partie</button>
          </center>
        </div>
        <div className="Centre">
          <p>Le code partie est : {code}</p>
          <p>L'hôte est : {host}</p>
          {joueursCo()}
        </div>
      </Container>
    </div>
  );
}

export default SalleAttente;
