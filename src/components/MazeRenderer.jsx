import Banana from '../assets/Banana.png';

class MazeRenderer {
  constructor(maze, ctx, cellSize) {
    this.maze = maze;
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.ctx.lineWidth = this.cellSize / 40;
    this.drawMaze();
    this.drawEndFlag();
  }

  drawCell = (x, y, cell) => {
    const startX = x * this.cellSize;
    const startY = y * this.cellSize;

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

  drawMaze = () => {
    this.maze.map().forEach((row, x) => {
      row.forEach((cell, y) => {
        this.drawCell(x, y, cell);
      });
    });
  };

    drawEndFlag = () => {
        const coord = this.maze.endCoord();
        const fraction = this.cellSize / 4 - 2;
        const homeImage = new Image();
        homeImage.src = Banana;

        homeImage.onload = () => {
            this.ctx.drawImage(
                homeImage,
                coord.x * this.cellSize,
                coord.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );
        };
    };

}

export default MazeRenderer;
