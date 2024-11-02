import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './pages/WelcomePage/Welcome';
import SignUp from './pages/SignUpPage/SignUp';
import Login from './pages/LoginPage/Login';
import GamePlay from './pages/GamePlayPage/GamePlay';
import LevelPage from './pages/LevelPage/LevelPage';
import EssayGame from './components/EssayGame/EssayGame';
import MediumGame from './components/MediumGame/MediumGame';
import HardGame from './components/HardGame/HardGame';
import ExpertGame from './components/ExpertGame/ExpertGame';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { lookInSession } from './components/Session';

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({ access_token: null});

  useEffect(() => {
    let userInSession = lookInSession('user');
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null});
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
          <Route path='/game/medium' element={<MediumGame/>}/>
          <Route path='/game/hard' element={<HardGame/>}/>
          <Route path='/game/expert' element={<ExpertGame/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
