import { Container ,ListGroup, Button} from "react-bootstrap";
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
  const [tab, setPlayers] = useState({players: []});
  const [nbJ, setNbJ] = useState(null);
  let nbJoueursCo =0;

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
    nbJoueursCo = game.nbJoueursCo;
  }

  useEffect(() => {
    fetchPlayers();
    if (code) {
      const socket = io("http://localhost:5000", { transports: ["websocket"] });
      setSocket(socket);
  
      socket.on("update-players-co", (joueurs) => {
        setPlayers(joueurs);
        async function test(){
          const codePartie = window.location.search.substr(1);
          nbJoueursCo = nbJoueursCo /*+ 1 je n'arrive pas a gerer le -1 a la deconnection*/;
          const modifGame = {nbJoueurs : nbJ, code : code, host : host, nbJoueursCo : nbJoueursCo};
          await fetch(`http://localhost:5000/updateGame/${codePartie}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(modifGame),
          })
          .catch(error => {
              window.alert(error);
              return;
          });
        }
        test();
      });
      
      socket.emit("join-room", { roomId: code, username: getUser() }); 

      return () => {
        socket.disconnect();
      };
    };
    // eslint-disable-next-line
  }, [code]);

  function startGame() {
    socket.emit("start-game", { roomId: code }); // émettre l'événement "start-game" sur la socket
  }

  if(socket!==null){
    socket.on("redirect-to-game", (gameUrl) => {
      navigate(gameUrl, { replace: true }); // rediriger les joueurs vers la page de jeu
    });
  }

  function joueursCo() {
    if (nbJ === 0) {
      return <p>Aucun joueur connecté.</p>;
    }
  
    const items = [];
    for (let i = 0; i < nbJ; i++) {
      items.push(
        <ListGroup.Item key={i} as="li">
          Joueur {i + 1} : {tab.players[i]}
        </ListGroup.Item>
      );
    }
  
    return <div>{items}</div>;
  }
  
  function partiePleine() {
    if (tab.players.length === nbJ) {
      if(getUser() === host){
        return (
          <div>
            <ListGroup.Item as="li">
              <Button onClick={startGame} variant='success'>Commencer la partie</Button>
            </ListGroup.Item>
          </div>
        )
      }
      else {
        return (
          <div>
            <ListGroup.Item as="li">
              Nous attendons que l'hote lance le jeu.
            </ListGroup.Item>
          </div>
        )
      }
    }
    else {
      return (
        <div>
            <ListGroup.Item as="li">
              Nous attendons la partie soit pleine.
            </ListGroup.Item>
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
            <h1> Salle d'attente de {host}</h1>
          </center>
        </div>
        <div className="Attente">
        <ListGroup as="ul" align='center'>
          <ListGroup.Item as="li" active>
            Le code partie est : {code}
          </ListGroup.Item>
          {joueursCo()}
          {partiePleine()}
        </ListGroup>
        </div>
      </Container>
    </div>
  );
}

export default SalleAttente;
