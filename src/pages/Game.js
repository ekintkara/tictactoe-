import "../App.css";
import Layout from "../components/Layout";
import Box from "../components/Box";
import { useState, useEffect } from "react";

import { Button,  Modal, ModalBody } from "reactstrap";

const defaultBoxes = () => new Array(9).fill(null);

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Game() {
  const [clickNumber, setClickNumber] = useState(0);
  const [modal, setModal] = useState(false);
  const [boxes, setBoxes] = useState(defaultBoxes());
  const [winner, setWinner] = useState(null);
  const toggle = () => setModal(!modal);
  useEffect(() => {
    const isComputerTurn = boxes.filter((box) => box !== null).length % 2 === 1;
    const linesThatAre = (a, b, c) => {
      return lines.filter((boxIndexes) => {
        const boxValues = boxIndexes.map((index) => boxes[index]);
        return (
          JSON.stringify([a, b, c].sort()) === JSON.stringify(boxValues.sort())
        );
      });
    };

    const emptyIndexes = boxes
      .map((box, index) => (box === null ? index : null))
      .filter((val) => val !== null);
    const playerWon = linesThatAre("x", "x", "x").length > 0;
    const computerWon = linesThatAre("o", "o", "o").length > 0;
    if (playerWon) {
      toggle();
      setWinner("x");
    } else if (computerWon) {
      setWinner("o");
      toggle();
    }
    if (clickNumber === 5) {
      if (computerWon || playerWon) {
      } else {
        setWinner("y");
        setClickNumber(clickNumber + 1);
        toggle();
      }
    }

    const putComputerAt = (index) => {
      let newBoxes = boxes;
      newBoxes[index] = "o";
      setBoxes([...newBoxes]);
    };
    if (isComputerTurn) {
      const winingLines = linesThatAre("o", "o", null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter(
          (index) => boxes[index] === null
        )[0];
        putComputerAt(winIndex);
        return;
      }

      const linesToBlock = linesThatAre("x", "x", null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(
          (index) => boxes[index] === null
        )[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre("o", null, null);
      if (linesToContinue.length > 0) {
        putComputerAt(
          linesToContinue[0].filter((index) => boxes[index] === null)[0]
        );
        return;
      }

      const randomIndex =
        emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
      putComputerAt(randomIndex);
    }
  }, [boxes]);

  function handleBoxClick(index) {
    setClickNumber(clickNumber + 1);
    const isPlayerTurn = boxes.filter((box) => box !== null).length % 2 === 0;
    if (isPlayerTurn) {
      let newBoxes = boxes;
      newBoxes[index] = "x";
      setBoxes([...newBoxes]);
    }
  }
  const resetGame = () => {
    setClickNumber(0);
    setBoxes(defaultBoxes());
    setWinner(null);
    toggle();
  };

  return (
    <main>
      <Layout>
        {boxes.map((box, index) => (
          <Box
            x={box === "x" ? 1 : 0}
            o={box === "o" ? 1 : 0}
            disabled={box === "x" || box === "o"}
            onClick={() => handleBoxClick(index)}
          />
        ))}
      </Layout>

      {winner === "x" && <div>win</div>}
      {winner === "y" && <div>Drow</div>}
      {winner === "o" && <div>Computer Wins</div>}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody className="modal-body"><Button className="reset-button" color="danger" onClick={resetGame}>
            RESET
          </Button></ModalBody>
       
      </Modal>
    </main>
  );
}

export default Game;
