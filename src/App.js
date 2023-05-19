import Header from './components/Header';
import Chat from './components/Chat';
import SignIn from './components/SignIn';

import './App.css';
import { useState } from 'react';

function App() {
  const [logIn, setLogIn] = useState(false)
  const [userName, setUserName] = useState('Nombre del Usuario')

  if(logIn) {
    return (
      <div className="App">
        <Header userName={userName}/>
        <Chat />
      </div>
    );
  } else {
    return (
      <div className="App">
        <SignIn setUserName={setUserName} setLogIn={setLogIn}/>
      </div>
    );
  }

}

export default App;
