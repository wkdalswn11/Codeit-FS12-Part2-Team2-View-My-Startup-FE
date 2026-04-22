import React from "react";
import Input from "./Input";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  readOnly = false,
  disabled = false,
  textarea = false,
  className = "",
}) => {
  return (
    <label className={`detail-edit-label ${className}`}>
      {label}

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="detail-edit-textarea"
          readOnly={readOnly}
          disabled={disabled}
        />
      ) : (
        <Input
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
        />
      )}
    </label>
  );
};

export default FormField;
