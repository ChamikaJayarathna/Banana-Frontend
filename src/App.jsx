import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './pages/WelcomePage/Welcome';
import SignUp from './pages/SignUpPage/SignUp';
import Login from './pages/LoginPage/Login';
import GamePlay from './pages/GamePlayPage/GamePlay';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/game-play' element={<GamePlay/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;