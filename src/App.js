// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"

import Header from './components/Header';
import Chat from './components/Chat';
import SignIn from './components/SignIn';

import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
    const userName = useRef("")
    const profilePicUrl = useRef("")
    const [logIn, setLogIn] = useState(false)
    const initialLoad = useRef(false)

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
    const db = getFirestore(app)
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    function logInHandler() {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            userName.current = user.displayName
            profilePicUrl.current = user.photoURL
            localStorage.setItem("loggedIn",true)
            setLogIn(true)
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

    function logOutHandler() {
        signOut(auth)
        .then(() => {
            localStorage.clear()
            setLogIn(false)
            console.log("Sesion Finalizada con Exito")
        })
        .catch(err => {
            console.log(`Error al cerrar sesion: ${err}`)
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                userName.current = currentUser.displayName
                profilePicUrl.current = currentUser.photoURL
                setLogIn(true)
            } else {
                console.log("Sesion Cerrada")
            }
        })
    })

    const lastsBrought = useRef([])

    async function getFromDb(callback) {
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
            let exists = false
            const postData = Object.assign({id: doc.id}, doc.data())
            if(lastsBrought.current.length > 0) {
                lastsBrought.current.forEach(obj => {
                    if(obj.id === postData.id) {
                        exists = true
                    }
                })
            }

            if(!exists) {
                if(callback) {
                    callback(postData)
                }
                console.table(postData)
                lastsBrought.current.push(postData)
            }
            //console.log(`Id de tabla: ${doc.id}`)
        });
    }

    async function addToDb(userName, posterImage, message, image, tabDest, postDate) {
        try {
            const docRef = await addDoc(collection(db, "posts"), {
              userName: userName,
              posterImage: posterImage,
              message: message,
              image: image,
              tabDest: tabDest,
              postDate: postDate
        });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    if(logIn && localStorage.getItem('loggedIn')) {
        return (
            <div className="App">
                <Header 
                    userData={{name: userName.current, profilePic: profilePicUrl.current}}
                    logOut={logOutHandler}/>
                <Chat 
                    userName={userName.current} 
                    profilePicUrl={profilePicUrl.current} 
                    db={
                        {
                            add: addToDb, 
                            get: getFromDb, 
                            loadedData: lastsBrought.current,
                            loadedDb: initialLoad}}
                    />
            </div>
    )
    } else if(!logIn && localStorage.getItem("loggedIn")) {
        return (
            <div className="App">
                loading...
            </div>
        )
    } else {
        return (
        <div className="App">
            <SignIn logInHandler={logInHandler} />
        </div>
        );
    }

}

export default App;
