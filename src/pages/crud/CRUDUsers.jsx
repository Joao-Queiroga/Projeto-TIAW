import { useEffect, useState } from "react";
import { db } from '../../services/firebase';


export function CRUDUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [uid, setUid] = useState();
  const [nome, setNome] = useState();

  useEffect(() => {
    const docs = [];
    const getDocs = db.collection("users").get().then((querySnapshot) => {
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

  return(
    <div className="container">
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
        <input type="text" className="form-control"
          placeholder="Digite o nome do usuário"
          name="nome"
          onChange={event => setNome(event.target.value)}
          value={nome}/>
      <button type="submit" className="btn btn-primary">Criar Novo usuário</button>
      </form>
    </div>
  );
}
