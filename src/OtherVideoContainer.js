import {
  CarouselDown,
  CarouselLeft,
  CarouselRight,
  CarouselUp,
} from "./carousel";
import VideoBox from "./VideoBox";

function OtherVideoContainer(props) {
  const {
    activePlayer,
    cameraViewNumber,
    isOver,
    addActiveIndex,
    subActiveIndex,
    setIsFullScreen,
  } = props;
  let activePlayerList = Object.keys(activePlayer.playerToDist);
  return (
    <div
      id="video-container"
      style={{
        position: `absolute`,
        top: `50px`,
        left: `50%`,
        transform: `translateX(-50%)`,
        height: "130px",
        width: `${cameraViewNumber * 196 + 80}px`,
        backgroundColor: "yellow",
      }}
    >
      <div
        id="other-video-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {isOver && <CarouselLeft onClick={subActiveIndex} />}
        {activePlayerList.map((playerId, idx) => (
          <div
            key={playerId}
            style={{
              width: "180px",
              height: "120px",
              margin: "0 8px",
            }}
          >
            <VideoBox
              setIsFullScreen={setIsFullScreen}
              playerId={playerId}
              text={`${playerId}:${activePlayer.playerToDist[playerId]}`}
              style={
                idx !== activePlayerList.length - 1
                  ? { marginRight: "16px" }
                  : {}
              }
            />
          </div>
        ))}
        {isOver && <CarouselRight onClick={addActiveIndex} />}
      </div>
    </div>
  );
}

function OtherVideoVerticalContainer({
  activePlayer,
  subActiveIndex,
  addActiveIndex,
  setIsFullScreen,
  cameraVerticalViewNumber,
}) {
  let activePlayerList = Object.keys(activePlayer.playerToDist);
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 3,
        height: "100%",
        width: "212px",
        left: "0px",
        top: "0px",
        backgroundColor: "#3A3A3C",
        borderRadius: "0px",
        overflowY: "hidden",
      }}
    >
      <div className="vertical-my-video" style={{ margin: "0 auto" }}>
        <div
          className="VideoBoxWrapper"
          style={{
            width: "180px",
            height: "120px",
            margin: "16px auto",
          }}
        >
          <VideoBox text={`playerId: Dist`} />
        </div>
      </div>

      <CarouselUp onClick={subActiveIndex} />

      <div
        className="vertical-other-video-wrapper"
        style={{ margin: "0 auto" }}
      >
        {activePlayerList.map((playerId, idx) => (
          <div
            key={playerId}
            className="VideoBoxWrapper"
            style={{
              width: "180px",
              height: "120px",
              margin: "16px auto",
            }}
          >
            <VideoBox
              setIsFullScreen={setIsFullScreen}
              playerId={playerId}
              text={`${playerId}:${activePlayer.playerToDist[playerId]}`}
            />
          </div>
        ))}
      </div>
      <CarouselDown onClick={addActiveIndex} />
    </div>
  );
}

export { OtherVideoContainer, OtherVideoVerticalContainer };
