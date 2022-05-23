import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { CRUDComunidade } from './pages/crud/CRUDComunidade';
import { CRUDUsers } from './pages/crud/CRUDUsers';
import { CRUDPost } from './pages/crud/CRUDPosts';
import { Menu } from './pages/Menu';
import { UpdateComunidade } from './pages/crud/UpdateComunidade';
import { UpdatePost } from './pages/crud/UpdatePost';
import { UpdateUser } from './pages/crud/UpdateUser';

function App() {

  return (
    <Router>
      <Switch>
      <Route path="/Projeto-TIAW" exact>
        <Menu />
      </Route>
      <Route path="/Projeto-TIAW/login" exact>
        <Login />
      </Route>
      <Route path="/Projeto-TIAW/home">
        <Navbar />
        <Home />
      </Route>
      <Route path="/Projeto-TIAW/crud/comunidade" exact>
        <CRUDComunidade />
      </Route>
      <Route path="/Projeto-TIAW/crud/comunidade/:id" exact>
          <UpdateComunidade />
      </Route>
      <Route path="/Projeto-TIAW/crud/users" exact>
        <CRUDUsers />
      </Route>
      <Route path="/Projeto-TIAW/crud/users/:id" exact>
        <UpdateUser />
      </Route>
      <Route path="/Projeto-TIAW/crud/posts" exact>
        <CRUDPost />
      </Route>
      <Route path="/Projeto-TIAW/crud/posts/:id" exact>
          <UpdatePost />
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
