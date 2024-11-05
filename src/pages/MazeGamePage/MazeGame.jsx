import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Maze from '../../components/Maze';
import Player from '../../components/Player';
import MazeRenderer from '../../components/MazeRenderer';
import VictoryMessage from '../../components/VictoryMessage';
import './MazeGame.css';

const MazeGame = () => {
  const { level } = useParams();

  const difficultyMapping = {
    easy: 10,
    medium: 15,
    hard: 25,
    expert: 38, 
  };

  const [maze, setMaze] = useState(null);
  const [player, setPlayer] = useState(null);
  const [moves, setMoves] = useState(0);
  const [victory, setVictory] = useState(false);

  const canvasRef = useRef(null);

  const startMaze = (difficulty) => {
    setVictory(false);
    setMoves(0);
    const newMaze = new Maze(difficulty, difficulty);
    setMaze(newMaze);
  };

  useEffect(() => {
    const selectedDifficulty = difficultyMapping[level] || 10;
    startMaze(selectedDifficulty);
  }, [level]);

  useEffect(() => {
    if (maze && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const cellSize = canvasRef.current.width / (difficultyMapping[level] || 10);
      new MazeRenderer(maze, context, cellSize);
      const newPlayer = new Player(maze, context, setMoves, setVictory, difficultyMapping[level] || 10);
      setPlayer(newPlayer);
    }
  }, [maze, level]);

  useEffect(() => {
    const resizeCanvas = () => {
      const viewWidth = document.getElementById('view').clientWidth;
      const viewHeight = document.getElementById('view').clientHeight;
      const canvas = canvasRef.current;

      if (viewHeight < viewWidth) {
        canvas.width = viewHeight - viewHeight / 100;
        canvas.height = viewHeight - viewHeight / 100;
      } else {
        canvas.width = viewWidth - viewWidth / 100;
        canvas.height = viewWidth - viewWidth / 100;
      }

      if (maze && player) {
        const context = canvas.getContext('2d');
        const newCellSize = canvas.width / (difficultyMapping[level] || 10);
        new MazeRenderer(maze, context, newCellSize);
        player.redrawPlayer(newCellSize);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [maze, player, level]);

  return (
    <div id="page">
      <div id="view">
        <div id="mazeContainer">
          <canvas id="mazeCanvas" className='border' ref={canvasRef} width="1100" height="1100"></canvas>
        </div>
      </div>

      <p id="instructions">Use arrow keys to move the key to the house!</p>

      {victory && <VictoryMessage moves={moves} />}
    </div>
  );
};

export default MazeGame;