import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from '../../services/firebase';


export function CRUDPost() {
  const history = useHistory()

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

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

  const AlteraPost = (id) => {
    history.push("/Projeto-TIAW/crud/posts/" + id);
  }

  async function DeletaPost(id) {
    await db.collection("posts").doc(id).delete().then(() => {
      console.log("Deletado com sucesso")
    })
    setLoading(true);
  }

  function Tabela() {
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
                <td><button className="btn btn-secondary" onClick={() => AlteraPost(post.id)}>Editar</button></td>
                <td><button className="btn btn-danger" onClick={() => DeletaPost(post.id)}>Remover</button></td>
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
            <th scope="col">conteudo</th>
            <th scope="col">id criador</th>
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
      <h1>Posts</h1>
        <Tabela />
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
    </div>
  );
}
