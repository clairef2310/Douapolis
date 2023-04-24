import { Button,Container, Image ,Col, Row} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import warning from "./images/warning.png"

//composanant affichant une page d'erreur
function Erreur(props){

    let choice = null
    let navigate = useNavigate()

    //vérification si la page existe et si l'utilisateur a les droits
    if (props.value === 1){
        choice ="Vous n'êtes pas autorisé à accéder à cette page"
    }
    else{
        choice="Vous n'êtes pas connecté"
    }

    //Redirection sur la page de connexion
    function Redirigate(){
        navigate('/')
    }
    
    return(
        <Container responsive="true" className="text-center align-items-center mt-5">
            <Row>
                <Col>
                    <h1 className="mt-5 text-center font-weight-bold fw-bold" >{choice}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Image alt=""  src={warning} width="400"  height="400" className="mt-5 d-inline-block align-center me-2 "/><br/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant='danger' size="lg" className="mt-5 align-center" onClick={Redirigate}>Revenir à l'écran de Connexion </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Erreur