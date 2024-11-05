class Maze {
    constructor(Width, Height) {
      this.width = Width;
      this.height = Height;
      this.dirs = ["n", "s", "e", "w"];
      this.modDir = {
        n: { y: -1, x: 0, o: "s" },
        s: { y: 1, x: 0, o: "n" },
        e: { y: 0, x: 1, o: "w" },
        w: { y: 0, x: -1, o: "e" }
      };
      this.genMap();
      this.defineStartEnd();
      this.defineMaze();
    }
  
    // Generate the maze map
    genMap = () => {
      this.mazeMap = Array.from({ length: this.height }, () =>
        Array.from({ length: this.width }, () => ({
          n: false,
          s: false,
          e: false,
          w: false,
          visited: false,
          priorPos: null
        }))
      );
    };
  
    // Maze generation algorithm (recursive backtracking)
    defineMaze = () => {
      let isComp = false;
      let move = false;
      let cellsVisited = 1;
      let numLoops = 0;
      let maxLoops = 0;
      let pos = { x: 0, y: 0 };
      const numCells = this.width * this.height;
  
      while (!isComp) {
        move = false;
        this.mazeMap[pos.x][pos.y].visited = true;
  
        if (numLoops >= maxLoops) {
          this.shuffle(this.dirs);
          maxLoops = Math.round(this.rand(this.height / 8));
          numLoops = 0;
        }
        numLoops++;
  
        for (let index = 0; index < this.dirs.length; index++) {
          const direction = this.dirs[index];
          const nx = pos.x + this.modDir[direction].x;
          const ny = pos.y + this.modDir[direction].y;
  
          if (
            nx >= 0 &&
            nx < this.width &&
            ny >= 0 &&
            ny < this.height &&
            !this.mazeMap[nx][ny].visited
          ) {
            this.mazeMap[pos.x][pos.y][direction] = true;
            this.mazeMap[nx][ny][this.modDir[direction].o] = true;
            this.mazeMap[nx][ny].priorPos = pos;
            pos = { x: nx, y: ny };
            cellsVisited++;
            move = true;
            break;
          }
        }
  
        if (!move) {
          pos = this.mazeMap[pos.x][pos.y].priorPos;
        }
        if (numCells === cellsVisited) {
          isComp = true;
        }
      }
    };
  
    // Define the start and end points of the maze
    defineStartEnd = () => {
      switch (this.rand(4)) {
        case 0:
          this.startCoordVal = { x: 0, y: 0 };
          this.endCoordVal = { x: this.height - 1, y: this.width - 1 };
          break;
        case 1:
          this.startCoordVal = { x: 0, y: this.width - 1 };
          this.endCoordVal = { x: this.height - 1, y: 0 };
          break;
        case 2:
          this.startCoordVal = { x: this.height - 1, y: 0 };
          this.endCoordVal = { x: 0, y: this.width - 1 };
          break;
        case 3:
          this.startCoordVal = { x: this.height - 1, y: this.width - 1 };
          this.endCoordVal = { x: 0, y: 0 };
          break;
      }
    };
  
    // Utility functions
    rand = (max) => Math.floor(Math.random() * max);
  
    shuffle = (a) => {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
  
    // Getters for external usage
    map = () => this.mazeMap;
    startCoord = () => this.startCoordVal;
    endCoord = () => this.endCoordVal;
}

export default Maze;  