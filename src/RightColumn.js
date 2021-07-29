export default function RightColumn() {
    return (
      <div
        style={{
          position: "absolute",
          backgroundColor: "purple",
          top: "40px",
          right: "40px",
          width: "224px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 999,
        }}
      >
        Right Column
      </div>
    );
  }