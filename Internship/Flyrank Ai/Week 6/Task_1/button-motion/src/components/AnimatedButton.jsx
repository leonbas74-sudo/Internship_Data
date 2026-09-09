import { useState } from "react";
import { motion } from "framer-motion";

function AnimatedButton() {
  const [state, setState] = useState("idle");

  const handleClick = () => {
    if (state === "loading") return;

    setState("loading");

    setTimeout(() => {
      const success = Math.random() > 0.2;

      if (success) {
        setState("success");
      } else {
        setState("error");
      }

      setTimeout(() => {
        setState("idle");
      }, 2000);
    }, 1500);
  };

  const buttonColor =
    state === "success"
      ? "#10b981"
      : state === "error"
      ? "#ef4444"
      : "#2563eb";

  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      style={{
        padding: "14px 30px",
        border: "none",
        borderRadius: "14px",
        cursor: "pointer",
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "600",
        backgroundColor: buttonColor,
        minWidth: "180px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
      }}
    >
      {state === "idle" && "Send Message"}
      {state === "loading" && "Loading..."}
      {state === "success" && "✓ Sent"}
      {state === "error" && "✗ Retry"}
    </motion.button>
  );
}

export default AnimatedButton;