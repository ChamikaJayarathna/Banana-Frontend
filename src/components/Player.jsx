import Banana from '../assets/Banana.png';
import Monkey from '../assets/momkey10.png';
import MazeRenderer from './MazeRenderer';

class Player {
  constructor(maze, ctx, setMoves, setVictory, difficulty) {
    this.maze = maze;
    this.ctx = ctx;
    this.cellSize = ctx.canvas.width / difficulty;
    this.moves = 0;
    this.setMoves = setMoves;
    this.setVictory = setVictory;
    this.position = { x: maze.startCoord().x, y: maze.startCoord().y };
    this.touchStartX = 0;
    this.touchStartY = 0;

    // Bind event handlers
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);

    // Load images
    this.keyImage = new Image();
    this.keyImage.src = Monkey;

    this.homeImage = new Image();
    this.homeImage.src = Banana;

    this.imagesLoaded = false;

    Promise.all([
      new Promise((resolve) => {
        this.keyImage.onload = resolve;
        this.keyImage.onerror = () => console.error('Failed to load monkey image');
      }),
      new Promise((resolve) => {
        this.homeImage.onload = resolve;
        this.homeImage.onerror = () => console.error('Failed to load banana image');
      })
    ]).then(() => {
      this.imagesLoaded = true;
      this.drawInitialState();
    });

    this.bindEvents();
  }

  bindEvents = () => {
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchmove', this.handleTouchMove);
  };

  unbindEvents = () => {
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
  };

  drawInitialState = () => {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const mazeRenderer = new MazeRenderer(this.maze, this.ctx, this.cellSize);
    this.drawPlayer();
  };

  handleTouchStart = (e) => {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
  };

  handleTouchMove = (e) => {
    if (!this.touchStartX || !this.touchStartY) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const diffX = this.touchStartX - touchEndX;
    const diffY = this.touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        this.handleKeydown({ keyCode: 37 });
      } else {
        this.handleKeydown({ keyCode: 39 });
      }
    } else {
      if (diffY > 0) {
        this.handleKeydown({ keyCode: 38 });
      } else {
        this.handleKeydown({ keyCode: 40 });
      }
    }

    this.touchStartX = 0;
    this.touchStartY = 0;
  };

  handleKeydown = (e) => {
    let moved = false;
    const { n, s, e: east, w } = this.maze.map()[this.position.x][this.position.y];
    const oldPos = { ...this.position };

    switch (e.keyCode) {
      case 37:
        if (w) {
          this.position.x--;
          moved = true;
        }
        break;
      case 38:
        if (n) {
          this.position.y--;
          moved = true;
        }
        break;
      case 39:
        if (east) {
          this.position.x++;
          moved = true;
        }
        break;
      case 40:
        if (s) {
          this.position.y++;
          moved = true;
        }
        break;
      default:
        break;
    }

    if (moved) {
      this.moves++;
      this.setMoves(this.moves);
      
      this.ctx.clearRect(
        oldPos.x * this.cellSize,
        oldPos.y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
      
      const cell = this.maze.map()[oldPos.x][oldPos.y];
      this.drawCell(oldPos.x, oldPos.y, cell);
      
      this.drawPlayer();
      
      if (this.position.x === this.maze.endCoord().x && 
          this.position.y === this.maze.endCoord().y) {
        setTimeout(() => {
          this.setVictory(true);
          this.unbindEvents();
        }, 100);
      }
    }
  };

  drawCell = (x, y, cell) => {
    const startX = x * this.cellSize;
    const startY = y * this.cellSize;
    
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = this.cellSize / 40;

    if (!cell.n) this.drawLine(startX, startY, startX + this.cellSize, startY);
    if (!cell.s) this.drawLine(startX, startY + this.cellSize, startX + this.cellSize, startY + this.cellSize);
    if (!cell.e) this.drawLine(startX + this.cellSize, startY, startX + this.cellSize, startY + this.cellSize);
    if (!cell.w) this.drawLine(startX, startY, startX, startY + this.cellSize);
  };

  drawLine = (x1, y1, x2, y2) => {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  };

  drawPlayer = () => {
    if (!this.imagesLoaded) return;

    this.ctx.drawImage(
      this.keyImage,
      this.position.x * this.cellSize,
      this.position.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  };

  redrawPlayer = (newCellSize) => {
    this.cellSize = newCellSize;
    this.drawInitialState();
  };
}

export default Player;