import VideoBox from "./VideoBox";

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
        <VideoBox text={"myVideo"} playerId={"myVideo"} />
      </div>
    </div>
  );
}

export default MyVideoContainer;
