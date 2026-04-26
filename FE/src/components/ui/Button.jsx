import React from "react";
import "./Button.css";

function Button({
  children,
  type = "Button-large",
  variant = "Button-primary",
  icon,
  className = "",
  htmlType = "button",
  ...rest
}) {
  return (
    <button
      type={htmlType}
      className={`Button-btn ${type} ${variant} ${className}`}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
