import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './pages/WelcomePage/Welcome';
import SignUp from './pages/SignUpPage/SignUp';
import Login from './pages/LoginPage/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;