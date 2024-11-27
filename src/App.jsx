import React, { createContext, useContext, useEffect, useState } from 'react';
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
import Leaderboard from './components/Leaderboard/Leaderboard';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';

export const UserContext = createContext({});

const GameRouter = () => {

  const { level } = useParams();
  const { setGameMode } = useContext(UserContext);

  useEffect(() => {
    setGameMode(level);
  },[level, setGameMode])

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
  const [userAuth, setUserAuth] = useState({ access_token: null, _id: null});
  const [gameMode, setGameMode] = useState(null);

  useEffect(() => {
    let userInSession = lookInSession('user');
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null, _id: null});
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth, gameMode, setGameMode }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/game-play' element={<GamePlay />} />
          <Route path='/level' element={<LevelPage />} />
          <Route path="/game/:level" element={<GameRouter />} /> 
          <Route path='/profile/:userId' element={<ProfilePage />} />
          <Route path='/maze-game/:level' element={<MazeGame />} />
          <Route path='/leaderboard' element={<Leaderboard/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
