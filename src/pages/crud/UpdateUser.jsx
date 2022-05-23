import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../../services/firebase";

export function UpdateUser() {
  const history = useHistory()
  const [nome, setNome] = useState();

  const id = useParams().id;

  useEffect(() => {
    db.collection("users").doc(id).get().then(doc => {
      setNome(doc.data().nome)
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

  return (
    <div className="container">
      <h1>Posts</h1>
      <form className="container" onSubmit={EditaPost}>
        <input type="text" className="form-control my-1"
          onChange={event => setNome(event.target.value)}
          value={nome}/>
        <button type="submit" className="btn btn-primary my-1">Edita Usuário</button>
      </form>
    </div>
  );
}
