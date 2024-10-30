import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './pages/WelcomePage/Welcome';
import SignUp from './pages/SignUpPage/SignUp';
import Login from './pages/LoginPage/Login';
import GamePlay from './pages/GamePlayPage/GamePlay';
import LevelPage from './pages/LevelPage/LevelPage';
import EssayGame from './components/EssayGame/EssayGame';
import { lookInSession } from './components/Session';

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({ access_token: null });

  useEffect(() => {
    let userInSession = lookInSession('user');
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/game-play' element={<GamePlay />} />
          <Route path='/level' element={<LevelPage />} />
          <Route path='/game/essay' element={<EssayGame/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
