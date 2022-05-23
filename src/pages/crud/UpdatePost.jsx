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

  return (
    <div className="container">
      <h1>Posts</h1>
      <form className="container" onSubmit={EditaPost}>
        <input type="text" className="form-control my-1"
          onChange={event => setConteudo(event.target.value)}
          value={conteudo}/>
        <button type="submit" className="btn btn-primary my-1">Edita Post</button>
      </form>
    </div>
  );
}
