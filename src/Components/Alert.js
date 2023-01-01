import React, { useEffect } from "react";
import "./Alert.css";

function Alert({ msg, type, removeAlert }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  });

  return (
    <p className="alert__message" style={{ backgroundColor: type }}>
      {msg}
    </p>
  );
}

export default Alert;
