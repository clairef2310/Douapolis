import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import "./index.css";
import { getUser } from "./testAuth/AuthApi";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

function SalleAttente() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [host, setHost] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Créer une instance de socket.io-client et se connecter au serveur
    const socket = io('http://localhost:5000');

    // Récupérer le code de partie à partir de l'URL
    const codePartie = window.location.search.substr(1);

    // Écouter l'événement "updatePlayers" pour mettre à jour la liste des joueurs
    socket.on('updatePlayers', (game) => {
      setCode(game.code);
      setHost(game.host);
      setPlayers(game.joueurs);
    });

    // Émettre l'événement "joinGame" pour rejoindre la salle d'attente
    socket.emit('joinGame', codePartie);

    // Nettoyer l'instance de socket lorsque le composant est démonté
    return () => {
      socket.disconnect();
    };
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
            <p key={index}>{player}</p>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default SalleAttente;
