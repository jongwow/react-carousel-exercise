import { useState } from "react";
import { randomColor } from "./randomId";

function VideoBox({ text, style }) {
  const [showMenu, setShowMenu] = useState(false);
  let color = randomColor(text[0]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: "20px",
        backgroundColor: color,
      }}
      onMouseLeave={() => setShowMenu(false)}
      onMouseEnter={() => setShowMenu(true)}
    >
      <div
        style={{
          width: "180px",
          height: "120px",
          objectFit: "cover",
        }}
      >
        video
      </div>

      {showMenu && <GameVideoMenu />}
      <GameVideoName name={text} />
    </div>
  );
}
function GameVideoMenu() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
        backgroundColor: "pink",
      }}
    >
      <div style={{ marginRight: "12px" }}>{micOn}</div>
      <div style={{ marginRight: "12px" }}>{videoOn}</div>
      <div>{fullScreen}</div>
    </div>
  );
}

function GameVideoName({ name }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "8px",
        right: "8px",
        textOverflow: "ellipsis",
        height: "23px",
        borderRadius: "12px",
        padding: "4px 6px",
        backgroundColor: "rgba(0,0,0,0.6)",
        color: "white",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {name}
    </div>
  );
}

export default VideoBox;

const micOn = (
  <img
    style={{ width: "32px", height: "32px" }}
    alt="mic_on"
    src={require("./images/v1/mic_on.png").default}
  />
);
const videoOn = (
  <img
    style={{ width: "32px", height: "32px" }}
    alt="video_on"
    src={require("./images/v1/video_on.png").default}
  />
);
const fullScreen = (
  <img
    style={{ width: "32px", height: "32px" }}
    alt="full"
    src={require("./images/v1/full.png").default}
  />
);
