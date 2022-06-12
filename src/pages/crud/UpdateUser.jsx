import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../../services/firebase";

export function UpdateUser() {
  const history = useHistory()

  const [nome, setNome] = useState();
  const [idComunidades, setIdComunidades] = useState([]);

  const id = useParams().id;

  useEffect(() => {
    db.collection("users").doc(id).get().then(doc => {
      setNome(doc.data().nome)
      setIdComunidades(doc.data().id_comunidades)
    })
  }, []);

  function EditaPost(event) {
    event.preventDefault();
    
    if (nome.trim() === '')
      return;

    db.collection("users").doc(id).update({
      nome: nome,
    })
    history.push("/Projeto-TIAW/crud/users")
  }

  function Comunidades() {
    const [novoId, setNovoId] = useState('')
    let comunidades = idComunidades;

    async function AddComunidade() {
      comunidades.push(novoId);
      setNovoId('');
      setIdComunidades(comunidades);
      await db.collection("users").doc(id).update({
        id_comunidades: idComunidades,
      })
    }

    async function RemoveComunidade(idc) {
      comunidades = comunidades.filter(value => {
        return value !== idc;
      })
      setNovoId('');
      setIdComunidades(comunidades);
      await db.collection("users").doc(id).update({
        id_comunidades: comunidades,
      })
    }

    return(
      <table className="table table-hover w-50">
        <thead>
        <tr>
          <th scope="col">Id Comunidade</th>
        </tr>
        </thead>
        <tbody>
          {idComunidades.map((idComunidade) => (
            <tr>
              <th scope="row">{idComunidade}</th>
              <td><button type="button" className="btn btn-danger" onClick={() => RemoveComunidade(idComunidade)}>Remover</button></td>
            </tr>
          ))}
          <tr>
            <th>
              <input type="text" className="form-control my-1"
                placeholder="Digite o id da Comunidade"
                name="id_criador"
                onChange={event => setNovoId(event.target.value)}
                value={novoId}/>
            </th>
            <td><button type="button" className="btn btn-success" onClick={() => AddComunidade()}>Adicionar</button></td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <div className="container">
      <h2>Usuários</h2>
      <form className="container" onSubmit={EditaPost}>
        <input type="text" className="form-control my-1"
          onChange={event => setNome(event.target.value)}
          value={nome}/>
        <button type="submit" className="btn btn-primary my-1">Editar Usuário</button>
        <h2>Comunidades</h2>
        <Comunidades />
      </form>
    </div>
  );
}
