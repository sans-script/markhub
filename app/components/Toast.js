import React, { useState, useEffect } from "react";

const Toast = ({ message, onClose, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: {
      backgroundColor: "#4caf50",
      color: "#fff",
    },
    error: {
      backgroundColor: "#f44336",
      color: "#fff",
    },
    common: {
      position: "absolute",
      bottom: "20px",
      right: "20px",
      padding: "10px 20px",
      borderRadius: "5px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
    },
  };

  const toastStyle = type === "success" ? styles.success : styles.error;

  return (
    <div
      style={{
        ...styles.common,
        ...toastStyle,
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
