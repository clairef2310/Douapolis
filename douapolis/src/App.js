import {BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import Connexion from './Connexion';
import Accueil from './Accueil';
import Profil from './Profil';
import Jeu from './Jeu'
import NewCompte from './NewCompte';
import Parametres from './Parametres';
import NewJeu from './NewJeu';
import SalleAttente from './SalleAttente';
import { UserProvider } from './testAuth/userAuth';
import AjoutStats from './AjoutStats';
import GestionAmis from './GestionAmis';

function App() {
    //routes qui vont permettre de naviguer dans l'application
    return (
        <div>
            <Router>
                <UserProvider>
                    <Routes>
                        <Route  path='/' element={<Accueil/>} />
                        <Route  path='/Connexion' element={<Connexion/>} />   
                        <Route  path='/Parametres' element={<Parametres/>} /> 
                        <Route  path='/Jeu' element={<Jeu/>} />   
                        <Route  path='/Profil/' element={<Profil/>} />         
                        <Route  path='/NewCompte' element={<NewCompte/>} />    
                        <Route  path='/NewJeu' element={<NewJeu/>} />                    
                        <Route  path='/SalleAttente' element={<SalleAttente/>} />
                        <Route  path='/AjoutStats' element={<AjoutStats/>} />   
                        <Route  path='/GestionAmis' element={<GestionAmis/>} />              
                    </Routes>
                </UserProvider>
            </Router>
        </div>
    );
}

export default App;
