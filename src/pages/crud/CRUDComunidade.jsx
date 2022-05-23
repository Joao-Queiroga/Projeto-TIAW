import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from '../../services/firebase';


export function CRUDComunidade() {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [comunidades, setComunidades] = useState([]);

  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();
  const [idCriador, setIdCriador] = useState();
  const [nome, setNome] = useState();
//  const [idUsuarios, setIdUsuarios] = useState([]);

  useEffect(() => {
    const docs = [];
    const getDocs = db.collection("comunidades").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docs.push({id: doc.id, ...doc.data()});
      });
      setComunidades(docs);
      setLoading(false);
    });
  }, [loading]);

  function CorpoTabela() {
    if (loading)
      return <h1>Loading...</h1>
    return (
      <>
        {comunidades.map(comunidade => (
            <tr>
              <th scope="col">{comunidade.id}</th>
              <td>{comunidade.nome}</td>
              <td>{comunidade.id_admin}</td>
            </tr>
          ))
        }
      </>
    )
  }

  function AlteraComunidade(event) {
    event.preventDefault();

    if (idUpdate.trim() === '')
      return;

    history.push("/Projeto-TIAW/crud/comunidade/" + idUpdate);
  }

  async function DeletaComunidade(event) {
    event.preventDefault();

    if (idDelete.trim() === '')
      return

    await db.collection("comunidades").doc(idDelete).delete().then(() => {
      console.log("Deletado com sucesso")
    })
    window.location.reload();
  }

  async function NovaComunidade(event) {
    event.preventDefault();

    if (nome.trim() === '' || idCriador.trim() === '')
      return

    await db.collection("comunidades").add({
      nome: nome,
      id_admin: idCriador,
      id_usuarios: [ idCriador ],
    })
    window.location.reload();
  }

  return(
    <div className="container">
      <Link to="/Projeto-TIAW" className="btn btn-primary">Menu</Link>
      <h1>Comunidades</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">nome</th>
            <th scope="col">id admin</th>
          </tr>
        </thead>
        <tbody>
          <CorpoTabela />
        </tbody>
      </table>
      <h1>Adiciona comunidade</h1>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
      <form className="container" onSubmit={NovaComunidade}>
        <input type="text" className="form-control my-1"
          placeholder="Digite o nome da comunidade"
          onChange={event => setNome(event.target.value)}
          value={nome}/>
        <input type="text" className="form-control my-1"
          placeholder="Digite o id do criador"
          onChange={event => setIdCriador(event.target.value)}
          value={idCriador}/>
      <button type="submit" className="btn btn-primary my-1">Criar Nova Comunidade</button>
      </form>
      <h1>Edita Comunidade</h1>
      <form className="container" onSubmit={AlteraComunidade}>
        <input type="text" className="form-control my-1"
          placeholder="Digite o id da Comunidade"
          onChange={event => setIdUpdate(event.target.value)}
          value={idUpdate}/>
        <button type="submit" className="btn btn-primary my-1">Alterar Comunidade</button>
      </form>
      <h1>Deleta comunidade</h1>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
      <form className="container" onSubmit={DeletaComunidade}>
        <input type="text" className="form-control my-1"
          placeholder="Digite o id da Comunidade"
          onChange={event => setIdDelete(event.target.value)}
          value={idDelete}/>
      <button type="submit" className="btn btn-primary my-1">Deletar Comunidade</button>
      </form>
    </div>
  );
}
