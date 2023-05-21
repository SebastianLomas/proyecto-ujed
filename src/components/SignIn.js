import ujedLogo from '../assets/img/ujed-logo-1.png'
import './css/SignIn.css'
import {FaGoogle} from 'react-icons/fa'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function SignIn(props) {
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
    const analytics = getAnalytics(app);
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    function logIn() {
        const auth = getAuth();
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
                    props.setUserName(result.user.displayName)
                    props.setLogIn(true)
                    props.setProfilePicUrl(user.reloadUserInfo.photoUrl)
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

    return (
        <article className="signin-screen">
            <header className="signin-screen__header">
                <h1 className="signin-screen__header-text">universidad juarez<br></br>del estado de durango</h1>
                <picture className="signin-screen__header-logo">
                    <img src={ujedLogo} alt="UJED LOGO" />
                </picture>
            </header>
            <article className="signin-screen__welcome">
                <div className='signin-screen__welcome-text'>
                    <h1><p>¡hola!</p>bienvenidos</h1>
                    <span>al sistema de auncios de <span>ujed</span></span>
                </div>
            </article>
            <section className='signin-screen__form'>
                <div className='signin-button' onClick={logIn}>
                    <span><FaGoogle /></span>
                    <span>iniciar sesion</span>
                </div>
            </section>
            <footer className='signin-screen__footer'>
                <span>es necesario ingresar con tu <span>cuenta institucional</span></span>
            </footer>
        </article>
    )
}

export default SignIn