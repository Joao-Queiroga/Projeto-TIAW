import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from '../../services/firebase';


export function CRUDPost() {
  const history = useHistory()
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();
  const [idUsuario, setIdUsuario] = useState();
  const [conteudo, setConteudo] = useState();

  useEffect(() => {
    const docs = [];
    const getDocs = db.collection("posts").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docs.push({id: doc.id, ...doc.data()});
      });
      setPosts(docs);
      setLoading(false);
    });
  }, [loading]);

  function CorpoTabela() {
    if (loading)
      return <h1>Loading...</h1>
    console.log(posts);
    return (
      <>
        {posts.map(post => (
            <tr>
              <th scope="row">{post.id}</th>
              <td>{post.conteudo}</td>
              <td>{post.id_usuario}</td>
            </tr>
          ))
        }
      </>
    )
  }

  async function NovoPost(event) {
    event.preventDefault();

    if (conteudo.trim() === '' || idUsuario.trim() === '')
      return

    await db.collection("posts").add({
      id_usuario: idUsuario,
      conteudo: conteudo,
    })
    window.location.reload();
  }

  function AlteraPost(event) {
    event.preventDefault();

    if (idUpdate.trim() === '')
      return;

    history.push("/Projeto-TIAW/crud/posts/" + idUpdate);
  }

  async function DeletaPost(event) {
    event.preventDefault();

    if (idDelete.trim() === '')
      return

    await db.collection("posts").doc(idDelete).delete().then(() => {
      console.log("Deletado com sucesso")
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
            <th scope="col">conteudo</th>
            <th scope="col">id criador</th>
          </tr>
        </thead>
        <tbody>
          <CorpoTabela />
        </tbody>
      </table>
      <h1>Adiciona Posts</h1>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
      <form className="container" onSubmit={NovoPost}>
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
      <h1>Edita Post</h1>
      <form className="container" onSubmit={AlteraPost}>
        <input type="text" className="form-control my-1"
          placeholder="Digite o id do Usuário"
          onChange={event => setIdUpdate(event.target.value)}
          value={idUpdate}/>
        <button type="submit" className="btn btn-primary my-1">Editar Post</button>
      </form>
      <h1>Deleta Posts</h1>
      <form className="container" onSubmit={DeletaPost}>
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
