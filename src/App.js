import "./App.css";
import RightColumn from "./RightColumn";
import LeftColumn from "./LeftColumn";
import { useEffect } from "react";

function VideoBox({ text, style }) {
  return (
    <div
      style={{
        backgroundColor: "green",
        width: "180px",
        height: "120px",
        borderRadius: `20px`,
        float: "left",
        ...style,
      }}
    >
      {text}
    </div>
  );
}
function MyVideoContainer() {
  return (
    <div
      id="my-video"
      style={{
        position: `absolute`,
        left: `40px`,
        bottom: `40px`,
      }}
    >
      <div
        style={{
          height: `100%`,
          backgroundColor: "pink",
        }}
      >
        <VideoBox text={"myVideo"} />
      </div>
    </div>
  );
}
function OtherVideoContainer() {
  const contents = [{ text: "first" }, { text: "Second" }, { text: "Third" }];
  return (
    <div
      id="video-container"
      style={{
        position: `absolute`,
        top: `50px`,
        left: `50%`,
        transform: `translateX(-50%)`,
      }}
    >
      <div
        id="other-video-wrapper"
        style={{
          textAlign: "center",
          display: "block",
        }}
      >
        {contents.map((content, idx) => (
          <VideoBox
            key={idx}
            text={content.text}
            style={idx !== contents.length - 1 ? { marginRight: "16px" } : {}}
          />
        ))}
      </div>
    </div>
  );
}

function GameVideoContainer() {
  return (
    <>
      <OtherVideoContainer />
      <MyVideoContainer />
    </>
  );
}

function App() {
  const handleResize = () => {
    console.log(`브라우저 화면 사이즈 x: ${window.innerWidth}, y: ${window.innerHeight}`);
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => { // cleanup 
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#eeeeee",
        }}
      >
        <LeftColumn />
        <RightColumn />
      </div>
      <GameVideoContainer />
    </div>
  );
}

export default App;
