import MyVideoContainer from "./MyVideoContainer";
import {
  OtherVideoContainer,
  OtherVideoVerticalContainer,
} from "./OtherVideoContainer";
import { randomColor } from "./randomId";

function GameVideoContainer({
  activePlayer,
  cameraViewNumber,
  isOver,
  addActiveIndex,
  subActiveIndex,
  setIsFullScreen,
}) {
  return (
    <>
      <OtherVideoContainer
        setIsFullScreen={setIsFullScreen}
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
  setIsFullScreen,
  isOver,
  isFullScreen,
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
        setIsFullScreen={setIsFullScreen}
        cameraVerticalViewNumber={cameraVerticalViewNumber}
      />
      <BigScreenContainer playerId={isFullScreen} />
    </>
  );
}

function BigScreenContainer({ playerId }) {
  let color = randomColor(playerId[0]);
  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        zIndex: 2,
        marginLeft: "24px",
        marginRight: "24px",
        left: "212px",
        width: `calc(100% - 508px)`,
        minHeight: "360px",
        backgroundColor: color,
      }}
    ></div>
  );
}

export { GameVideoVerticalContainer, GameVideoContainer };
