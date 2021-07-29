export default function LeftColumn() {
    return (
      <div
        style={{
          position: "absolute",
          top: "30vh",
          left: "11px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "red",
          justifyContent: "space-between",
          color: "white",
          fontSize: "14px",
          zIndex: 999,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "122px",
              height: "46px",
              borderRadius: "24px",
              backgroundColor: "#47335F",
              display: "flex",
              alignItems: "center",
              padding: "11px 11px",
            }}
          >
            <div style={{ position: "relative", marginRight: "12px" }}>
              이미지
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#00FF47",
                  borderRadius: "50%",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  border: "2px solid white",
                }}
              ></div>
            </div>
            <div
              onClick={() => {
                alert("내 닉네임");
              }}
              style={{ lineHeight: "15px" }}
            >
              내 닉네임
              <div style={{ color: "#C7C7C7", fontSize: "10px" }}>
                {"개인 설정 >"}
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            alert("설정");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "122px",
              height: "46px",
              borderRadius: "24px",
              backgroundColor: "#47335F",
              display: "flex",
              alignItems: "center",
              padding: "11px 11px",
            }}
          >
            <div style={{ marginRight: "12px" }}>아이콘</div>
            공간 설정
          </div>
        </div>
        <div
          onClick={() => alert("invite")}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "122px",
              height: "46px",
              borderRadius: "24px",
              backgroundColor: "#47335F",
              display: "flex",
              alignItems: "center",
              padding: "11px 11px",
            }}
          >
            <div style={{ marginRight: "12px" }}>아이콘</div>
            친구 초대
          </div>
        </div>
      </div>
    );
  }