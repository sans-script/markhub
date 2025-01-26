import React, { useState, useEffect } from "react";

const Toast = ({ message, onClose, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // O toast irá desaparecer após 1 segundo (durante a transição)
    
    // Chama o onClose após a transição terminar
    setTimeout(() => {
      onClose();
    }, 2500); // Esse tempo deve ser maior do que o tempo de desaparecimento do toast
    
    return () => clearTimeout(timer);
  }, [onClose]);

  // Estilos para sucesso e erro
  const styles = {
    success: {
      backgroundColor: "#4caf50", // Verde
      color: "#fff",
    },
    error: {
      backgroundColor: "#f44336", // Vermelho
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
      opacity: isVisible ? 1 : 0, // Controla a visibilidade com a transição de opacidade
      transform: isVisible ? "translateY(0)" : "translateY(20px)", // Efeito de translação
      transition: "opacity 0.5s ease, transform 0.5s ease", // Transição suave para opacidade e transformação
    },
  };

  // Escolhe o estilo com base no tipo (sucesso ou erro)
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
