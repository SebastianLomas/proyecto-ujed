import Header from './components/Header';
import Chat from './components/Chat';
import SignIn from './components/SignIn';

import './App.css';
import { useState } from 'react';

function App() {
  const [logIn, setLogIn] = useState(false)
  const [userName, setUserName] = useState('Nombre del Usuario')
  const [profilePicUrl , setProfilePicUrl] = useState(null)

  if(logIn) {
    return (
      <div className="App">
        <Header userName={userName} profilePicUrl={profilePicUrl} />
        <Chat />
      </div>
    );
  } else {
    return (
      <div className="App">
        <SignIn setUserName={setUserName} setLogIn={setLogIn} setProfilePicUrl={setProfilePicUrl}/>
      </div>
    );
  }

}

export default App;
