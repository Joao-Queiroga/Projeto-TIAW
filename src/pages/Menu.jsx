import { useHistory } from "react-router-dom";

export function Menu() {
  const history = useHistory()

  return (
  <div className="container">
    <h1>Escolha qual Base de dados Você deseja acessar</h1>
    <div className="btn-group">
      <button className="btn btn-primary" onClick={() => history.push("/Projeto-TIAW/crud/comunidade")}>CRUD Comunidades</button>
      <button className="btn btn-primary" onClick={() => history.push("/Projeto-TIAW/crud/posts")}>CRUD Posts</button>
      <button className="btn btn-primary" onClick={() => history.push("/Projeto-TIAW/crud/users")}>CRUD Users</button>
    </div>
  </div>
  )
}
