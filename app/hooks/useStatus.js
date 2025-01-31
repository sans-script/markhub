import { useState } from "react";

const useStatus = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [errorKey, setErrorKey] = useState(0);
  const [loading, setLoading] = useState(false);

  return {
    isTransitioning,
    setIsTransitioning,
    errorKey,
    setErrorKey,
    loading,
    setLoading,
  };
};

export default useStatus;
