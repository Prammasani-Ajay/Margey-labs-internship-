import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/Login.css';
import { sotrage , app} from '../firebase';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useSelector, useDispatch } from 'react-redux';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import Loader from './Loader';

function Login() {
    const { register, handleSubmit } = useForm();
    const db = getFirestore(app);
    const auth = getAuth(app); // Initialize Firebase Auth

    const { users, user, loading } = useSelector((state) => state);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            // Check local storage for user data
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                // User is already logged in, update state accordingly
                const user = JSON.parse(storedUser);
                dispatch({ type: 'LOGIN_SUCCESS', payload: { user: user } });
                window.location.href = '/dashboard'; // Redirect to dashboard
            } else if (users.length === 0) {
                try {
                    const querySnapshot = await getDocs(collection(db, 'BDUsers'));
                    const usersData = [];
                    querySnapshot.forEach((doc) => {
                        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                        usersData.push(doc.data());
                    });
                    dispatch({ type: 'FETCH_USERS_SUCCESS', payload: usersData });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            dispatch({ type: 'SET_LOADING', payload: false });
        };
        
        const checkLogin = async () => {
            if(!user){
                const loggedInUser = window.localStorage.getItem('user');
                if(loggedInUser){
                    let  userObj = JSON.parse(loggedInUser);
                    userObj ={
                        email: userObj.email,
                        accessToken : userObj.accessToken
                    }
                    dispatch({ type: 'LOGIN_SUCCESS', payload: { userObj: userObj } });
                    window.location.href = '/dashboard';
                } 
            }
        }

        checkLogin();
    }, [users]);

    const handleLogin = async (data) => {
        const { emailId, password } = data;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, emailId, password);
            const user = userCredential.user;
            const loggedInUser ={
                email: user.email,
                accessToken : user.accessToken
            } 

            // Dispatch loggedInUser to store
            dispatch({ type: 'LOGIN_SUCCESS', payload: { userObj: loggedInUser } });

            // Update local storage with user data
            localStorage.setItem('user', JSON.stringify(loggedInUser));

            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const submitForm = (data) => {
        handleLogin(data); // Call handleLogin with form data
    };

    return (
        <div className="main-login">
            {loading && <Loader />}
            <div className="login-container" style={{ maxWidth: '300px', margin: '0 auto' }}>
      {/* <h2 className="candidates-title">Candidates List</h2> */}
      <h1 className="login-title">Candidates List Login</h1>
      <form className="mt-10" onSubmit={handleSubmit(submitForm)}>
        <label className="input-label" htmlFor="email">
          Username
        </label>
        <input
          className="input-field"
          id="email"
          type="text"
          {...register('emailId')}
         
        />
        <label className="input-label mt-5" htmlFor="password">
          Password
        </label>
        <input
          className="input-field"
          id="password"
          type="password"
          {...register('password')}
        
        />
        <button
        style={{backgroundColor: '#0071bd !important', color: 'white'}}
          className="login-button"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
            <br /><br /><br />
            <app-footer className="footer"></app-footer>
        </div>
    );
}

export default Login;
