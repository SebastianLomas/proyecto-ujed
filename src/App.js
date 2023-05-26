// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

import Header from './components/Header';
import Chat from './components/Chat';
import SignIn from './components/SignIn';

import './App.css';
import { useState } from 'react';

function App() {
  const [logIn, setLogIn] = useState(false)
  const [userName, setUserName] = useState('Nombre del Usuario')
  const [profilePicUrl , setProfilePicUrl] = useState(null)

      // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyCm67pLWeZX7cM60I6ysT_VNj22o2LsIKs",
      authDomain: "projecto-ujed.firebaseapp.com",
      projectId: "projecto-ujed",
      storageBucket: "projecto-ujed.appspot.com",
      messagingSenderId: "409314775966",
      appId: "1:409314775966:web:ef0fad292b123f8922bc8f",
      measurementId: "G-20CE6NL28F"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const analytics = getAnalytics(app);
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    onAuthStateChanged(auth, (currentUser) => {
        setUserName(currentUser.displayName)
        setLogIn(true)
        setProfilePicUrl(currentUser.photoURL)
    })

    function logInHandler() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                console.log(user)
                
                if(user.email !== undefined) {
                    setUserName(result.user.displayName)
                    setLogIn(true)
                    setProfilePicUrl(user.photoURL)
                }
                //console.log(user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });

    }

  if(logIn) {
    return (
      <div className="App">
        <Header userName={userName} profilePicUrl={profilePicUrl} />
        <Chat userName={userName} profilePicUrl={profilePicUrl} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <SignIn logInHandler={logInHandler} setUserName={setUserName} setLogIn={setLogIn} setProfilePicUrl={setProfilePicUrl}/>
      </div>
    );
  }

}

export default App;
