import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from '../../services/firebase';


export function CRUDUsers() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [nome, setNome] = useState();

  useEffect(() => {
    const docs = [];
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docs.push({id: doc.id, ...doc.data()});
      });
      setUsers(docs);
      setLoading(false);
    });
  }, [loading]);

  async function NovoUsuario(event) {
    event.preventDefault();

    if (nome.trim() === '')
      return

    await db.collection("users").add({
      nome: nome,
      id_comunidades: [],
    })
    setLoading(true);
  }

  function EditUser(id) {
    history.push("/Projeto-TIAW/crud/users/" + id);
  }

  async function DeleteUser(id) {
    await db.collection("users").doc(id).delete().then(() => {
      console.log("Deletado com sucesso")
    })
    setLoading(true);
  }

  function Tabela() {
    function CorpoTabela() {
      if (loading)
        return <h1>Loading...</h1>
      console.log(users);
      return (
        <>
          {users.map(user => (
              <tr>
                <th scope="row">{user.id}</th>
                <td>{user.nome}</td>
                <td><button className="btn btn-secondary" onClick={() => EditUser(user.id)}>Editar</button></td>
                <td><button className="btn btn-danger" onClick={() => DeleteUser(user.id)}>Remover</button></td>
              </tr>
            ))
          }
        </>
      )
    }

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">nome</th>
          </tr>
        </thead>
        <tbody>
          <CorpoTabela />
        </tbody>
      </table>
    )
  }

  return(
    <div className="container">
      <Link to="/Projeto-TIAW" className="btn btn-primary">Menu</Link>
      <h1>Usuarios</h1>
      <Tabela />
      <h1>Adiciona Usuário</h1>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
      <form className="container" onSubmit={NovoUsuario}>
        <input type="text" className="form-control my-1"
          placeholder="Digite o nome do usuário"
          name="nome"
          onChange={event => setNome(event.target.value)}
          value={nome}/>
      <button type="submit" className="btn btn-primary my-1">Criar Novo usuário</button>
      </form>
    </div>
  );
}
