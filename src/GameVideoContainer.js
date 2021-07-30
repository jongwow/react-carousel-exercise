import MyVideoContainer from "./MyVideoContainer";
import OtherVideoContainer from "./OtherVideoContainer";

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

  export default GameVideoContainer;