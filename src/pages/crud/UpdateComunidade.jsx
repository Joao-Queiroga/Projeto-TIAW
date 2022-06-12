import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../../services/firebase";

export function UpdateComunidade() {
  const history = useHistory()
  const [idAdmin, setIdAdmin] = useState();
  const [nome, setNome] = useState();
  const [idUsuarios, setIdUsuarios] = useState([]);

  const id = useParams().id;

  useEffect(() => {
    db.collection("comunidades").doc(id).get().then(doc => {
      setIdAdmin(doc.data().id_admin);
      setNome(doc.data().nome);
      setIdUsuarios(doc.data().id_usuarios);
    })
  }, []);

  function AlteraComunidade(event) {
    event.preventDefault();
    
    if (nome.trim() === '' || idAdmin.trim() === '')
      return;

    db.collection("comunidades").doc(id).update({
      nome: nome,
      id_admin: idAdmin,
      id_usuarios: idUsuarios,
    })
    history.push("/Projeto-TIAW/crud/comunidade")
  }


  function Usuarios() {
    const [novoId, setNovoId] = useState();
    let users = idUsuarios;

    async function AdicionaUsuario () {
      users.push(novoId);
      setNovoId('');
      setIdUsuarios(users);
      await db.collection("comunidades").doc(id).update({
        id_usuarios: idUsuarios,
      })
    }
  
    async function RemoveUsuario (idu) {
      users = users.filter((value) => {
        return value !== idu;
      })
      setNovoId('');
      setIdUsuarios(users);
      await db.collection("comunidades").doc(id).update({
        id_usuarios: users,
      })
    }
    return(
      <table className="table table-hover w-50">
        <thead>
        <tr>
          <th scope="col">id usuario</th>
        </tr>
        </thead>
        <tbody>
          {idUsuarios.map((idUsuario) => (
            <tr>
              <th scope="row">{idUsuario}</th>
              <td><button type="button" className="btn btn-danger" onClick={() => RemoveUsuario(idUsuario)}>Remover</button></td>
            </tr>
          ))}
          <tr>
            <th>
              <input type="text" className="form-control my-1"
                placeholder="Digite o id do criador"
                name="id_criador"
                onChange={event => setNovoId(event.target.value)}
                value={novoId}/>
            </th>
            <td><button type="button" className="btn btn-success" onClick={AdicionaUsuario}>Adicionar</button></td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <div className="container">
      <h1>Comunidades</h1>
      <form className="container" onSubmit={AlteraComunidade}>
        <input type="text" className="form-control my-1"
          placeholder="Digite o nome da comunidade"
          name="nome"
          onChange={event => setNome(event.target.value)}
          value={nome}/>
        <input type="text" className="form-control my-1"
          placeholder="Digite o id do criador"
          name="id_criador"
          onChange={event => setIdAdmin(event.target.value)}
          value={idAdmin}/>
        <Usuarios />
        <button type="submit" className="btn btn-primary my-1">Salvar Alterações</button>
      </form>
    </div>
  );
}
