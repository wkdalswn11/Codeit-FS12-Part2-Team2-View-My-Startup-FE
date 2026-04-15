import React from "react";
import "./Button.css";

function Button({
  children,
  type = "Button-large",
  variant = "Button-primary",
  icon,
  ...props
}) {
  // type: Button-large, Button-medium, Button-outline
  // variant: Button-primary, Button-gray, Button-primary-outline, Button-outline-orange, Button-outline-gray
  return (
    <button className={`Button-btn ${type} ${variant}`} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
