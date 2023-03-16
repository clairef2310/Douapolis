import {BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import Connexion from './Connexion';
import Accueil from './Accueil';
import Profil from './Profil';
import Jeu from './Jeu'
import NewCompte from './NewCompte';
import NewJeu from './NewJeu';

function App() {
    //routes qui vont permettre de naviguer dans l'application
    return (
        <div>
            <Router>
                    <Routes>
                        <Route  path='/' element={<Accueil/>} />
                        <Route  path='/Connexion' element={<Connexion/>} />   
                        <Route  path='/Jeu' element={<Jeu/>} />   
                        <Route  path='/Profil/:pseudo' element={<Profil/>} />         
                        <Route  path='/NewCompte' element={<NewCompte/>} />    
                        <Route  path='/NewJeu' element={<NewJeu/>} />                    
                    </Routes>
            </Router>
        </div>
    );
}

export default App;
