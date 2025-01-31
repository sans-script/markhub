import React, { useState, useEffect } from "react";

const Toast = ({ message, onClose, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
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
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "10px 20px",
      borderRadius: "5px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      maxWidth: "300px",
    },
    responsive: {
      right: "50%",
      top: "40px",
      maxHeight: "40px",
      transform: isVisible ? "translate(50%, 0)" : "translate(50%, 20px)",
      width: "80%",
      maxWidth: "none",
      fontSize: "14px",
    },
  };

  const toastStyle = type === "success" ? styles.success : styles.error;

  return (
    <div
      style={{
        ...styles.common,
        ...toastStyle,
        ...(isMobile ? styles.responsive : {}),
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
