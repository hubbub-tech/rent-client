import React from 'react';
import Navbar from './components/base/Navbar';
import Footer from './components/base/Footer';
import Main from './components/pages/Main';
//import MetaData from './components/base/MetaData';

const App = () => {
  //const [myUsers, setMyUsers] = React.useState([]);
  const [myTestimonials, setMyTestimonials] = React.useState([]);
  React.useEffect(() => {
    fetch('/test').then(res => res.json()).then(data => {
      setMyTestimonials(data.testimonials);
    });
  }, []);
  return (
    <div className="App">
      <Navbar loggedIn={false} />
      <Main testimonials={myTestimonials}/>
      <Footer />
    </div>
  );
}

export default App;
