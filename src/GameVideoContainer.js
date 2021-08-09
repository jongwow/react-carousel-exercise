import { CarouselDown, CarouselLeft, CarouselUp } from "./carousel";
import MyVideoContainer from "./MyVideoContainer";
import OtherVideoContainer from "./OtherVideoContainer";
import VideoBox from "./VideoBox";

function GameVideoContainer({
  activePlayer,
  cameraViewNumber,
  isOver,
  addActiveIndex,
  subActiveIndex,
}) {
  return (
    <>
      <OtherVideoContainer
        activePlayer={activePlayer}
        isOver={isOver}
        addActiveIndex={addActiveIndex}
        subActiveIndex={subActiveIndex}
        cameraViewNumber={cameraViewNumber}
      />
      <MyVideoContainer />
    </>
  );
}

function GameVideoVerticalContainer({
  activePlayer,
  cameraVerticalViewNumber,
  isOver,
  addActiveIndex,
  subActiveIndex,
}) {
  return (
    <>
      <OtherVideoVerticalContainer
        activePlayer={activePlayer}
        isOver={isOver}
        addActiveIndex={addActiveIndex}
        subActiveIndex={subActiveIndex}
        cameraVerticalViewNumber={cameraVerticalViewNumber}
      />
    </>
  );
}

function OtherVideoVerticalContainer({
  activePlayer,
  subActiveIndex,
  addActiveIndex,
  cameraVerticalViewNumber,
}) {
  let activePlayerList = Object.keys(activePlayer.playerToDist);
  return (
    <div
      style={{
        position: "absolute",
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
export { GameVideoVerticalContainer, GameVideoContainer };
