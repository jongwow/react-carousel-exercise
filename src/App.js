import "./App.css";
import RightColumn from "./RightColumn";
import LeftColumn from "./LeftColumn";
import { useEffect, useRef, useState } from "react";
import { CarouselRight, CarouselLeft } from "./carousel";

function VideoBox({ text, style }) {
  return (
    <div
      style={{
        backgroundColor: "green",
        width: "180px",
        height: "120px",
        borderRadius: `20px`,
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

function App() {
  const cameraContainerMaxWidth = useRef(0);

  // const [playerInfoMap, setPlayerInfoMap] = useState({
  // playerToDist: { randomString: 1 },
  // });
  const [allPlayer, setAllPlayer] = useState({
    playerToDist: { randomString: 1 },
  });
  const [activeIndex, setActiveIndex] = useState({ start: 0 }); //항상 옳?
  const [isOver, setIsOver] = useState(false);
  // const [possiblePlayer, setPossiblePlayer] = useState({});
  const [activePlayer, setActivePlayer] = useState({
    playerToDist: { randomString: 1 },
  });
  const [cameraViewNumber, setCameraViewNumber] = useState(5);

  useEffect(() => {
    // 만약 cameraViewNumber보다 allPlayer가 작거나 같다면 그냥 넣기
    // 그렇지 않다면
    // - 처음 넘어간거면 앞에서부터 잘라서 넣는다?
    // - 이미 넘어간가면 st - end?

    // 만약 all = 10, st = 0, end = 7인데
    // 버튼을 눌러서 st=1, end=8로 옮겼다고생각해보자.
    // 그러면 그 상태에서 all + 1이 발동되면?
    // s=1,e=8 유지하지.
    let newActivePlayer = { playerToDist: {} };
    Object.keys(allPlayer.playerToDist)
      .slice(activeIndex.start, activeIndex.start + cameraViewNumber)
      .forEach((playerId) => {
        newActivePlayer.playerToDist[playerId] =
          allPlayer.playerToDist[playerId];
      });
    let newIsOver =
      cameraViewNumber < Object.keys(allPlayer.playerToDist).length;
    setIsOver(newIsOver);
    setActivePlayer(newActivePlayer);
  }, [allPlayer, cameraViewNumber, activeIndex]);

  const addActiveIndex = () => {
    // top을 넘어가면 안됨
    let top = Object.keys(allPlayer.playerToDist).length - cameraViewNumber;
    setActiveIndex((prev) => ({ ...prev, start: prev.start < top  ? prev.start + 1 : prev.start}));
  };

  const subActiveIndex = () => {
    // bottom을 넘어가면 안됨.
    setActiveIndex((prev) => ({ ...prev, start: prev.start > 0 ? prev.start - 1: prev.start }));
  };

  useEffect(() => {
    let dd = throttle(() => {
      cameraContainerMaxWidth.current = window.innerWidth - 390;
      let currentCameraViewNumber = getCameraViewNumber(
        cameraContainerMaxWidth.current
      );
      setCameraViewNumber(currentCameraViewNumber);
      console.log(
        `브라우저 화면 사이즈 x: ${window.innerWidth}, y: ${window.innerHeight}. InnerWidth: ${cameraContainerMaxWidth.current}, CameraView: ${currentCameraViewNumber}`
      );
    }, 500);
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
        <LeftColumn />
        <RightColumn setAllPlayer={setAllPlayer} allPlayer={allPlayer} />

        {Object.keys(allPlayer.playerToDist).map((playerId) => (
          <span key={playerId}>[{playerId}]</span>
        ))}
        <br />
        {Object.keys(activePlayer.playerToDist).map((playerId) => (
          <span key={`act-${playerId}`}>[{playerId}]</span>
        ))}
        <br />
        <span>{JSON.stringify(activeIndex)}</span>
      </div>
      <GameVideoContainer
        activePlayer={activePlayer}
        isOver={isOver}
        addActiveIndex={addActiveIndex}
        subActiveIndex={subActiveIndex}
        cameraViewNumber={cameraViewNumber}
      />
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

// function max(a, b){
//   return a > b ? a : b;
// }
// function min(a, b){
//   return a > b ? b: a;
// }
