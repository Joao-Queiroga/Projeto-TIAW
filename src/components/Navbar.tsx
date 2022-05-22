import '../styles/navbar.scss';

export function Navbar() {
  return (
    <nav className="navbar d-flex justify-content-between">
      <div className="logo navbar-brand">
        <h1 className="d-inline text-white navbar-brand">Logo</h1>
        <input type="search" className="navbar-brand text-white rounded" placeholder="Search"/>    
      </div>
      <a className="text-white navbar-brand" href="">Home</a>
      <a className="text-white navbar-brand" href="">Comunidades</a>
      <a className="text-white navbar-brand" href="">Amigos</a>
      <a className="text-white navbar-brand" href="">Chats</a>
    </nav> 
  );
}
