import "./App.css";
import RightColumn from "./RightColumn";
import LeftColumn from "./LeftColumn";
import { useEffect, useRef, useState } from "react";
import {
  GameVideoContainer,
  GameVideoVerticalContainer,
} from "./GameVideoContainer";

function App() {
  const innerWidth = useRef(0);
  const innerHeight = useRef(0);

  const [allPlayer, setAllPlayer] = useState({
    playerToDist: { randomString: 1 },
  });
  const [activeIndex, setActiveIndex] = useState({ start: 0 }); //항상 옳?
  const [isOver, setIsOver] = useState(false);
  const [activePlayer, setActivePlayer] = useState({
    playerToDist: { randomString: 1 },
  });
  const [cameraViewNumber, setCameraViewNumber] = useState(5);
  const [cameraVerticalViewNumber, setCameraVerticalViewNumber] = useState(5);
  const [isFullScreen, setIsFullScreen] = useState(null);
  useEffect(() => {
    let cvn = isFullScreen ? cameraVerticalViewNumber : cameraViewNumber;
    let newActivePlayer = { playerToDist: {} };
    let allPlayersLength = Object.keys(allPlayer.playerToDist).length; //TODO: Rename it

    let st = getBottomIndex(activeIndex.start, cvn, allPlayersLength);
    let en = st + cvn;

    Object.keys(allPlayer.playerToDist)
      .slice(st, en)
      .forEach((playerId) => {
        newActivePlayer.playerToDist[playerId] =
          allPlayer.playerToDist[playerId];
      });
    let newIsOver = cvn < allPlayersLength;
    setIsOver(newIsOver);
    setActivePlayer(newActivePlayer);
  }, [
    allPlayer,
    cameraVerticalViewNumber,
    cameraViewNumber,
    activeIndex,
    isFullScreen,
  ]);

  const addActiveIndex = () => {
    // top을 넘어가면 안됨
    let cvn = isFullScreen ? cameraVerticalViewNumber : cameraViewNumber;
    let top = Object.keys(allPlayer.playerToDist).length - cvn;
    setActiveIndex((prev) => ({
      ...prev,
      start: prev.start < top ? prev.start + 1 : prev.start,
    }));
  };

  const subActiveIndex = () => {
    // bottom을 넘어가면 안됨.
    setActiveIndex((prev) => ({
      ...prev,
      start: prev.start > 0 ? prev.start - 1 : prev.start,
    }));
  };

  useEffect(() => {
    innerWidth.current = window.innerWidth - 390;
    innerHeight.current = window.innerHeight - 136;
    let currentCameraVerticalViewNumber = getCameraVerticalViewNumber(
      innerHeight.current
    );
    setCameraVerticalViewNumber(currentCameraVerticalViewNumber);
    let currentCameraViewNumber = getCameraViewNumber(innerWidth.current);
    setCameraViewNumber(currentCameraViewNumber);

    let dd = throttle(() => {
      innerWidth.current = window.innerWidth - 390;
      innerHeight.current = window.innerHeight - 136;
      let currentCameraVerticalViewNumber = getCameraVerticalViewNumber(
        innerHeight.current
      );
      setCameraVerticalViewNumber(currentCameraVerticalViewNumber);
      let currentCameraViewNumber = getCameraViewNumber(innerWidth.current);
      setCameraViewNumber(currentCameraViewNumber);
      console.log(
        `브라우저 화면 사이즈 x: ${window.innerWidth}, y: ${window.innerHeight}. InnerWidth: ${innerWidth.current}, CameraView: ${currentCameraViewNumber}, InnerHeight:${innerHeight.current}, CameraVertical: ${currentCameraVerticalViewNumber}`
      );
    }, 300);
    window.addEventListener("resize", dd);
    return () => {
      // cleanup
      window.removeEventListener("resize", dd);
    };
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
        {/* <LeftColumn /> */}
        <RightColumn
          setAllPlayer={setAllPlayer}
          allPlayer={allPlayer}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
        <div style={{ marginLeft: "230px" }}>
          {/* For debugging ====== start ====== */}
          {Object.keys(allPlayer.playerToDist).map((playerId) => (
            <span key={playerId}>[{playerId}]</span>
          ))}
          <br />
          {Object.keys(activePlayer.playerToDist).map((playerId) => (
            <span key={`act-${playerId}`}>[{playerId}]</span>
          ))}
          <br />
          <span>{JSON.stringify(activeIndex)}</span>
          {/* For debugging ====== end ====== */}
        </div>
      </div>
      {isFullScreen ? (
        <GameVideoVerticalContainer
          activePlayer={activePlayer}
          isOver={isOver}
          addActiveIndex={addActiveIndex}
          subActiveIndex={subActiveIndex}
          setIsFullScreen={setIsFullScreen}
          isFullScreen={isFullScreen}
          cameraVerticalViewNumber={cameraVerticalViewNumber}
        />
      ) : (
        <GameVideoContainer
          activePlayer={activePlayer}
          isOver={isOver}
          addActiveIndex={addActiveIndex}
          subActiveIndex={subActiveIndex}
          setIsFullScreen={setIsFullScreen}
          cameraViewNumber={cameraViewNumber}
        />
      )}
    </div>
  );
}

export default App;

function throttle(fn, delay) {
  let st;
  return function (...args) {
    if (!st) {
      st = setTimeout(() => {
        st = null;
        fn.apply(this, args);
      }, delay);
    }
  };
}

/**
 * 현재 cameraContainerWidth를 이용해서 최대 보여질 수 있는 영상 개수를 반환
 *
 * @param {number} containerWidth 카메라 영역 너비. 가변
 * @returns {number} cameraViewNumber 보이는 최대 영상 숫자.
 */
function getCameraViewNumber(containerWidth) {
  if (containerWidth >= 1572) {
    return 7;
  }
  if (containerWidth >= 1376) {
    return 6;
  }
  if (containerWidth >= 1180) {
    return 5;
  }
  if (containerWidth >= 984) {
    return 4;
  }
  if (containerWidth >= 788) {
    return 3;
  }
  if (containerWidth >= 592) {
    return 2;
  }
  return 1;
}

/**
 * 현재 cameraContainerHeight를 이용해서 최대 보여질 수 있는 영상 개수를 반환
 *
 * @param {number} containerHeight 카메라 영역 높이. 가변
 * @returns {number} cameraVerticalViewNumber 보이는 최대 영상 숫자.
 */
function getCameraVerticalViewNumber(containerHeight) {
  if (containerHeight >= 1204) {
    return 8;
  }
  if (containerHeight >= 1068) {
    return 7;
  }
  if (containerHeight >= 932) {
    return 6;
  }
  if (containerHeight >= 796) {
    return 5;
  }
  if (containerHeight >= 660) {
    return 4;
  }
  if (containerHeight >= 524) {
    return 3;
  }
  return 2;
}

function getBottomIndex(start, width, top) {
  if (start + width > top) {
    if (top - width < 0) return 0;
    else return top - width;
  } else {
    return start;
  }
}
