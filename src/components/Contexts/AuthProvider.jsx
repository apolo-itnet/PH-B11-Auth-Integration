import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)


  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword (auth, email, password);
  }

  const signInUser = (email, password) => {
    setLoading(true)
   return signInWithEmailAndPassword (auth, email, password)
  }

  const signOutUser = () => {
    setLoading(true)
    return signOut(auth);
  }

  const googleSignIn  = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  useEffect( () => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      // console.log('current user inside of useEffect', currentUser);
      setUser(currentUser)
      setLoading(false)

    });
    return () => {
      unSubscribe();
    }
  }, [])

  const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    googleSignIn,
    signOutUser
  }
  return (
      <AuthContext value={userInfo}>
          {children}
      </AuthContext>
  );
};

export default AuthProvider;