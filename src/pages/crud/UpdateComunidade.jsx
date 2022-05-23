import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../../services/firebase";

export function UpdateComunidade() {
  const history = useHistory()
  const [idAdmin, setIdAdmin] = useState();
  const [nome, setNome] = useState();

  const id = useParams().id;

  useEffect(() => {
    db.collection("comunidades").doc(id).get().then(doc => {
      setIdAdmin(doc.data().id_admin);
      setNome(doc.data().nome)
    })
  }, []);

  function AlteraComunidade(event) {
    event.preventDefault();
    
    if (nome.trim() === '' || idAdmin.trim() === '')
      return;

    db.collection("comunidades").doc(id).update({
      nome: nome,
      id_admin: idAdmin,
    })
    history.push("/Projeto-TIAW/crud/comunidade")
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
        <button type="submit" className="btn btn-primary my-1">Altera comunidade</button>
      </form>
    </div>
  );
}
