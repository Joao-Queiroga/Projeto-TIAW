import { useEffect, useState } from "react";
import { db } from '../../services/firebase';


export function CRUDPost() {

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

  function CorpoTabela() {
    if (loading)
      return <h1>Loading...</h1>
    console.log(posts);
    return (
      <>
        {posts.map(post => (
            <tr>
              <th scope="row">{post.id}</th>
              <td>{post.id_usuario}</td>
              <td>{post.conteudo}</td>
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

  return(
    <div className="container">
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
      <h1>Adiciona comunidade</h1>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
      <form className="container" onSubmit={NovoPost}>
        <input type="text" className="form-control"
          placeholder="Digite o id do criador do post"
          onChange={event => setConteudo(event.target.value)}
          value={conteudo}/>
        <input type="text" className="form-control"
          placeholder="digite o conteúdo do post"
          onChange={event => setIdUsuario(event.target.value)}
          value={idUsuario}/>
      <button type="submit" className="btn btn-primary">Postar</button>
      </form>
    </div>
  );
}
