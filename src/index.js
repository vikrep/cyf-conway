import React from "react";
import ReactDOM from "react-dom";

import GameOfLife from "game-of-life-logic";

import "./styles.css";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      game: new GameOfLife(10, 10),
      running: false,
    };
  }

  clicked = (row, col) => {
    const oldValue = this.state.game.matrix[row][col];
    const newValue = oldValue === 0 ? 1 : 0;
    this.state.game.copyMatrixAt(row, col, [[newValue]]);
    this.forceUpdate();
  };

  tick = () => {
    this.state.game.tick();
    this.forceUpdate();
  };

  run = () => {
    this.setState({ running: true });
    this.interval = setInterval(() => this.tick(), 100);
  };

  stop = () => {
    clearInterval(this.interval);
    this.setState({ running: false });
  };

  random = () => {
    const matrix = this.state.game.matrix.map(row => row.map(() => getRandomInt(2)));
    this.state.game.copyMatrixAt(0, 0, matrix);
    this.forceUpdate();
  };

  render() {
    const game = this.state.game;
    return (
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <h2>Code Your Future Summit 2018</h2>
        <div className="matrix">
          {game.matrix.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
                {row.map((cell, colIndex) => (
                    <div className={cell ? 'live cell' : 'dead cell'}
                         key={colIndex}
                         onClick={() => this.clicked(rowIndex, colIndex)}></div>
                ))}
              </div>
          ))}
        </div>
        <button onClick={() => this.random()} disabled={this.state.running}>Random</button>
        <button onClick={() => this.tick()} disabled={this.state.running}>Tick</button>
        <button onClick={() => this.run()} disabled={this.state.running}>Run</button>
        <button onClick={() => this.stop()} disabled={!this.state.running}>Stop</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
