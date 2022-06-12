import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../../services/firebase";

export function UpdatePost() {
  const history = useHistory()
  const [conteudo, setConteudo] = useState();

  const id = useParams().id;

  useEffect(() => {
    db.collection("posts").doc(id).get().then(doc => {
      setConteudo(doc.data().conteudo)
    })
  }, []);

  function EditaPost(event) {
    event.preventDefault();
    
    if (conteudo.trim() === '')
      return;

    db.collection("posts").doc(id).update({
      conteudo: conteudo,
    })
    history.push("/Projeto-TIAW/crud/posts")
  }

  function Comentarios() {
    const [loading, setLoading] = useState(true);
    const [comentarios, setComentarios] = useState([]);

    const [idUsuario, setIdUsuario] = useState();
    const [conteudo, setConteudo] = useState();

    useEffect(() => {
      const docs = [];
      db.collection("comentarios").where("id_post", "==", id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          docs.push({id: doc.id, ...doc.data()});
        })
        setComentarios(docs);
        setLoading(false);
      })
    }, [loading]);

  async function DeletaComentario(id) {
    await db.collection("comentarios").doc(id).delete().then(() => {
      console.log("Deletado com sucesso")
    })
    setLoading(true);
  }

  async function Comenta(event) {
    event.preventDefault();

    if (conteudo.trim() === '' || idUsuario.trim() === '')
      return

    await db.collection("comentarios").add({
      id_post: id,
      id_usuario: idUsuario,
      conteudo: conteudo,
    })
    setLoading(true);
  }

    function CorpoTabela() {
      if (loading)
        return <h1>Loading...</h1>

      return (
        <>
          {comentarios.map(comentario => (
            <tr>
              <th scope="row">{comentario.id}</th>
              <td>{comentario.id_usuario}</td>
              <td>{comentario.conteudo}</td>
              <td><button className="btn btn-danger" onClick={() => DeletaComentario(comentario.id)}>Remover</button></td>
            </tr>
          ))}
        </>
      )
    }

    return(
      <>
      <h1>Comentarios</h1>
      <table className="table table-hover">
        <thead>
          <th scope="col">Id</th>
          <th scope="col">Id Usuário</th>
          <th scope="col">Conteudo</th>
        </thead>
        <tbody>
          <CorpoTabela />
        </tbody>
      </table>
      <h2>Comentar</h2>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
      <form className="container" onSubmit={Comenta}>
        <input type="text" className="form-control my-1"
          placeholder="Digite o id do criador do post"
          onChange={event => setIdUsuario(event.target.value)}
          value={idUsuario}/>
        <input type="text" className="form-control my-1"
          placeholder="digite o conteúdo do post"
          onChange={event => setConteudo(event.target.value)}
          value={conteudo}/>
        <button type="submit" className="btn btn-primary">Postar</button>
      </form>
      </>
    )
  }

  return (
    <div className="container">
      <h1>Posts</h1>
      <form className="container" onSubmit={EditaPost}>
        <input type="text" className="form-control my-1"
          onChange={event => setConteudo(event.target.value)}
          value={conteudo}/>
        <button type="submit" className="btn btn-primary my-1">Edita Post</button>
      </form>
      <Comentarios />
    </div>
  );
}
