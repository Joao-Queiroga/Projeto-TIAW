import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from '../../services/firebase';


export function CRUDUsers() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [uid, setUid] = useState();
  const [nome, setNome] = useState();
  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();

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
            </tr>
          ))
        }
      </>
    )
  }

  async function NovoUsuario(event) {
    event.preventDefault();

    if (nome.trim() === '')
      return

    await db.collection("users").add({
      nome: nome,
    })
    window.location.reload();
  }

  function AlteraUser(event) {
    event.preventDefault();

    if (idUpdate.trim() === '')
      return;

    history.push("/Projeto-TIAW/crud/users/" + idUpdate);
  }

  async function DeletaUser(event) {
    event.preventDefault();

    if (idDelete.trim() === '')
      return

    await db.collection("users").doc(idDelete).delete().then(() => {
      console.log("Deletado com sucesso")
    })
    window.location.reload();
  }

  return(
    <div className="container">
      <Link to="/Projeto-TIAW" className="btn btn-primary">Menu</Link>
      <h1>Usuarios</h1>
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
      <h1>Adiciona Usuário</h1>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
      <form className="container" onSubmit={NovoUsuario}>
        <input type="text" className="form-control my-1"
          placeholder="Digite o nome do usuário"
          name="nome"
          onChange={event => setNome(event.target.value)}
          value={nome}/>
      <button type="submit" className="btn btn-primary my-1">Criar Novo usuário</button>
      </form>
      <h1>Edita Usuário</h1>
      <form className="container" onSubmit={AlteraUser}>
        <input type="text" className="form-control my-1"
          placeholder="Digite o id do Usuário"
          onChange={event => setIdUpdate(event.target.value)}
          value={idUpdate}/>
        <button type="submit" className="btn btn-primary my-1">Editar Post</button>
      </form>
      <h1>Deleta Usuário</h1>
      <form className="container" onSubmit={DeletaUser}>
        <input type="text" className="form-control my-1"
          placeholder="Digite o id do Post"
          name="id_delete"
          onChange={event => setIdDelete(event.target.value)}
          value={idDelete}/>
      <button type="submit" className="btn btn-primary my-1">Deletar Post</button>
      </form>
    </div>
  );
}
