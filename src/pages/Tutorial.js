import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default class Tutorial extends Component {
  render() {
    return (
      <div className="tutorial-container">
        <h1 className="tutorial-title"> WELCOME TO TİCTACTOE </h1>
        <h2 className="tutorial-text">
          is a paper-and-pencil game for two players who take turns marking the
          spaces in a three-by-three grid with X or O. The player who succeeds
          in placing three of their marks in a horizontal, vertical, or diagonal
          row is the winner. It is a solved game, with a forced draw assuming
          best play from both players.
        </h2>
        <Link className="tutorial-button" to={"/game"}>
          START
        </Link>
      </div>
    );
  }
}
