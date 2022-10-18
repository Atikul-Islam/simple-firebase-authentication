
import './App.css';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import app from './Firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [user, setUser] = useState({})
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, provider)
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

  return (
    <div className="App">
      
      {user.email && <div>
        <img src={user.photoURL} alt="" />
        <h2>User Name : {user.displayName}</h2>
        <h4>Email : {user.email} <br /></h4>

      </div>}
      {user.email ?
        <button onClick={handleSignOut}>Google Sign Out</button>
        :
        <button onClick={handleGoogleSignIn}>Google Sign In</button>}

    </div>
  );
}

export default App;
