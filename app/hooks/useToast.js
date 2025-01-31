import { useState } from "react";
import Toast from "../components/Toast";

const useToast = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const ToastComponent = showToast ? (
    <Toast message={toastMessage} type={toastType} onClose={handleCloseToast} />
  ) : null;

  return [showToastMessage, ToastComponent];
};

export default useToast;