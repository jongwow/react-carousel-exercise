import { useRef } from "react";
import randomString from "./randomId";

export default function RightColumn({ setAllPlayer }) {
  const latestId = useRef('');
  const onClickCreate = () => {
    let id = randomString();
    setAllPlayer((prev) => {
      let newPlayers = Object.assign({}, prev);
      newPlayers.playerToDist[id] = 1;
      return newPlayers;
    })
    latestId.current = id;
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
    </div>
  );
}
