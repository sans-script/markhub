import React from "react";
import Toast from "../components/Toast";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, showToast: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, showToast: true }; // Ativa o toast ao capturar o erro
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erro capturado no Preview:", error, errorInfo);
  }

  handleCloseToast = () => {
    this.setState({ showToast: false }); // Fecha o toast
  };

  render() {
    const { hasError, showToast } = this.state;
    const { children, errorKey } = this.props;

    // Se houve um erro, renderiza o erro ou o toast
    return (
      <>
        {showToast && (
          <Toast
            message="Error rendering preview. Check the syntax."
            onClose={this.handleCloseToast}
            type="error"
          />
        )}
        {hasError ? (
          <div
            style={{
              padding: "0px 10px",
              color: "red",
            }}
          >
            Syntax Error
          </div>
        ) : (
          children
        )}
      </>
    );
  }
}

export default ErrorBoundary;
