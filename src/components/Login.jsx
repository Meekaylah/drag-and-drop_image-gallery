import React from 'react'
import { initializeApp } from "firebase/app";
import {  getAuth, signInWithEmailAndPassword   } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'


const firebaseConfig = {
  apiKey: "AIzaSyCugeVjV-8fjYNEwWLJaCz4_xmK_Hl5I8c",
  authDomain: "drag-and-drop-image-gall-b5add.firebaseapp.com",
  projectId: "drag-and-drop-image-gall-b5add",
  storageBucket: "drag-and-drop-image-gall-b5add.appspot.com",
  messagingSenderId: "431219206086",
  appId: "1:431219206086:web:23db6bb26145d1a883f4c7",
  measurementId: "G-QBC0SS1L9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


function Login() {
    const navigate = useNavigate();
    const onLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/DragDrop")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert(errorMessage);
        });
    
    }


    return(
        <div className="body">
            <div className="center">
                <h2>Meal Tracker</h2>
                <form method='post' onSubmit={onLogin}>
                    <div className="txt_field">
                        <input type="email" id='email' required />
                        <span></span>
                        <label htmlFor='email'>Email</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" id='password' required />
                        <span></span>
                        <label htmlFor='password'>Password</label>
                    </div>
                    <div className="pass">Forgot Password?</div>
                    <input type="submit" value="Login" />
                    <div className="signup-link">
                        Not a member? <a href="#">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login