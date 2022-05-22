import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { CRUDComunidade } from './pages/crud/CRUDComunidade';
import { CRUDUsers } from './pages/crud/CRUDUsers';
import { CRUDPost } from './pages/crud/CRUDPosts';

function App() {

  return (
    <>
    <Router>
      <Route path="/Projeto-TIAW" exact>
        <Login />
      </Route>
      <Route path="/home">
        <Navbar />
        <Home />
      </Route>
      <Route path="/crud/comunidade" exact>
        <CRUDComunidade />
      </Route>
      <Route path="/crud/users" exact>
        <CRUDUsers />
      </Route>
      <Route path="/crud/posts" exact>
        <CRUDPost />
      </Route>
    </Router>
    </>
  );
}

export default App;
