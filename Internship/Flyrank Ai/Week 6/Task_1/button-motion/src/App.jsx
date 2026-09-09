import AnimatedButton from "./components/AnimatedButton";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, #020617, #0f172a, #1e293b)",
        color: "#ffffff",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h1
  style={{
    color: "#60a5fa",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  }}
>
  AI Button Motion Demo
</h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Smooth micro-interactions using Framer Motion
        </p>

        <AnimatedButton />
      </div>
    </div>
  );
}

export default App;