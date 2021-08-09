import MyVideoContainer from "./MyVideoContainer";
import {
  OtherVideoContainer,
  OtherVideoVerticalContainer,
} from "./OtherVideoContainer";

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

export { GameVideoVerticalContainer, GameVideoContainer };
