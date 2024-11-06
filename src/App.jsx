import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Welcome from './pages/WelcomePage/Welcome';
import SignUp from './pages/SignUpPage/SignUp';
import Login from './pages/LoginPage/Login';
import GamePlay from './pages/GamePlayPage/GamePlay';
import LevelPage from './pages/LevelPage/LevelPage';
import EssayGame from './components/GameModes/EssayGame';
import MediumGame from './components/GameModes/MediumGame';
import HardGame from './components/GameModes/HardGame';
import ExpertGame from './components/GameModes/ExpertGame';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { lookInSession } from './components/Session';
import MazeGame from './pages/MazeGamePage/MazeGame';

export const UserContext = createContext({});

const GameRouter = () => {

  const { level } = useParams();

  switch(level) {
    case 'easy':
      return <EssayGame />;
    case 'medium':
      return <MediumGame />;
    case 'hard':
      return <HardGame />;
    case 'expert':
      return <ExpertGame />;
    default:
      return <div>Level not found</div>;
  }

}

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
          <Route path="/game/:level" element={<GameRouter />} /> 
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/maze-game/:level' element={<MazeGame />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
