import React, { createContext, useReducer } from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from './components/Navbar';

import Login from './components/Login';
import Signup from './components/Signup'; 
import Logout from './components/Logout'; 
import BasicTable from './components/BasicTable';

import 'bootstrap/dist/css/bootstrap.min.css';

import { initialState, reducer } from '../src/reducer/UseReducer';


//context api

export const UserContext = createContext();


const Routing = () => {
  return (
     
  <Routes>


  <Route path="/login"  element = {<Login />} />

  <Route path="/" element = {<Signup/>} />

  <Route path="/logout" element = {<Logout/>} />

  <Route path="/basictable" element = {<BasicTable/>} />

  
</Routes>
  )
}

export const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (

    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Navbar />

      <Routing />
   

    </UserContext.Provider>
    </>
  )
};

export default App; 
