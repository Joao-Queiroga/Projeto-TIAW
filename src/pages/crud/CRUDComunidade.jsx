import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from '../../services/firebase';



export function CRUDComunidade() {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [comunidades, setComunidades] = useState([]);

  const [idCriador, setIdCriador] = useState();
  const [nome, setNome] = useState();

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

  const AlteraComunidade = (id) => {
    history.push("/Projeto-TIAW/crud/comunidade/" + id);
  }

  async function DeletaComunidade(id) {
    await db.collection("comunidades").doc(id).delete().then(() => {
      console.log("Deletado com sucesso")
    })
    setLoading(true);
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
    setLoading(true);
  }


  function Tabela () {
  
    function CorpoTabela() {
      if (loading)
        return <h1>Loading...</h1>
      return (
        <>
          {comunidades.map(comunidade => (
              <tr>
                <th scope="row">{comunidade.id}</th>
                <td>{comunidade.nome}</td>
                <td>{comunidade.id_admin}</td>
                <td><button className="btn btn-secondary" onClick={() => AlteraComunidade(comunidade.id)}>Editar</button></td>
                <td><button className="btn btn-danger" onClick={() => DeletaComunidade(comunidade.id)}>Remover</button></td>
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
          <th scope="col">id admin</th>
        </tr>
      </thead>
      <tbody>
        <CorpoTabela />
      </tbody>
    </table>
  );
  }

  return(
    <div className="container">
      <Link to="/Projeto-TIAW" className="btn btn-primary">Menu</Link>
      <h1>Comunidades</h1>
      <Tabela />
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
    </div>
  );
}
