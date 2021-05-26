import React from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  const [myUsers, setMyUsers] = React.useState([]);
  React.useEffect(() => {
    fetch('/test').then(res => res.json()).then(data => {
      setMyUsers(data.users);
    });
  }, []);
  const formatName = (unformattedName) => {
    let _formattedName = unformattedName.split(",")
    let formattedName = _formattedName.join(" ")
    return formattedName;
  };
  return (
    <div className="App">
      <Navbar loggedIn={false}/>
      <header className="App-header">
        <h1>My Users</h1>
        {myUsers.map((user) => (
          <div className="users" key={user.id}>
            <h3>Hi, {formatName(user.name)} @ {user.address_street}</h3>
          </div>
        ))}
      </header>
      <Footer />
    </div>
  );
}

export default App;
