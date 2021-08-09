import { useRef } from "react";
import { randomString } from "./randomId";

export default function RightColumn({
  setAllPlayer,
  setIsFullScreen,
  isFullScreen,
}) {
  const latestId = useRef(["randomString1"]);
  const onClickCreate = () => {
    let id = randomString();
    setAllPlayer((prev) => {
      let newPlayers = Object.assign({}, prev);
      newPlayers.playerToDist[id] = 1;
      return newPlayers;
    });
    latestId.current.push(id);
  };

  const onClickRemove = () => {
    let id = latestId.current.pop();
    setAllPlayer((prev) => {
      let newPlayers = Object.assign({}, prev);
      delete newPlayers.playerToDist[id];
      return newPlayers;
    });
  };
  const onClickFull = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "purple",
        top: "40px",
        right: "40px",
        width: "224px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 999,
      }}
    >
      Right Column
      <button onClick={onClickCreate}>createPlayer</button>
      <button onClick={onClickRemove}>removePlayer</button>
      <button
        onClick={onClickFull}
        style={{
          backgroundColor: isFullScreen ? "red" : "blue",
          color: isFullScreen ? "black" : "white",
        }}
      >
        fullScreenToggle
      </button>
    </div>
  );
}
