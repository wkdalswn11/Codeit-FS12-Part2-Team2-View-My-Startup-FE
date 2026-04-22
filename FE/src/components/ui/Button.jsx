import React from "react";
import "./Button.css";

function Button({
  children,
  type = "Button-large",
  variant = "Button-primary",
  icon,
  className = "",
  ...props
}) {
  return (
    <button className={`Button-btn ${type} ${variant} ${className}`} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
