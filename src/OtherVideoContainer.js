import { CarouselLeft, CarouselRight } from "./carousel";
import VideoBox from "./VideoBox";

function OtherVideoContainer(props) {
    const {
      activePlayer,
      cameraViewNumber,
      isOver,
      addActiveIndex,
      subActiveIndex,
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
          {isOver && <CarouselLeft onClick={subActiveIndex}/>}
          {activePlayerList.map((playerId, idx) => (
            <VideoBox
              key={playerId}
              text={`${playerId}:${activePlayer.playerToDist[playerId]}`}
              style={
                idx !== activePlayerList.length - 1 ? { marginRight: "16px" } : {}
              }
            />
          ))}
          {isOver && <CarouselRight onClick={addActiveIndex}/>}
        </div>
      </div>
    );
  }
  
  export default OtherVideoContainer;