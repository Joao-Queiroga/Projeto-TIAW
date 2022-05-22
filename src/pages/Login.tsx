import { useHistory } from 'react-router-dom'; 
import { Button } from '../components/Button'
import googleIcon from '../assets/imgs/google-icon.svg';

import '../styles/auth.scss'

export function Login() {
  const history = useHistory();
//  const { user, signInWithGoogle } = useAuth();

  function HandleLogin() {
//    if(!user) {
//      await signInWithGoogle();
//    }

    history.push("/Projeto-TIAW/home")
  }

  return (
    <div id="page-auth">
      <aside>
        <h1>A logo vai aqui</h1>
        <h2>Encontre amigos com o mesmo interesse</h2>
      </aside>
      <main>
        <div className="main-content container">
          <h1>Logo</h1>
          <button onClick={HandleLogin} className="enter">
            <img src={googleIcon} alt='Logo do Google'/>
            Entre com o google
          </button>
          <div className="separator">ou entre na sua conta</div>
          <form onSubmit={HandleLogin}>
            <input type="text"
              placeholder="E-mail"/>
            <input type="password"
              placeholder="Senha"/>
            <Button type="submit">Entrar</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
