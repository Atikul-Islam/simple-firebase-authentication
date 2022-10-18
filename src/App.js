
import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import app from './Firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();


  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error => {
      console.log('error',error)
    })
  }

  const handleSignOut = () =>{
    signOut(auth)
    .then( () =>{
      setUser({});
    })
    .catch( () =>{
      setUser({});
    })
  }

  const handleGithubSignIn = () =>{
    signInWithPopup(auth,githubProvider)
    .then( result =>{
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch( error => {
      console.error('error',error);
    })
  }

  return (
    <div className="App">
      
      {user.uid && <div>
        <img src={user.photoURL} alt="" />
        <h2>User Name : {user.displayName}</h2>
        <h4>Email : {user.email} <br /></h4>

      </div>}
      {user.uid ?
        <button onClick={handleSignOut}>Sign Out</button>
        :
        <>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Sign In with Github</button>
        </>
        }

    </div>
  );
}

export default App;
