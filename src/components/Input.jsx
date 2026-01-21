import React from "react";

const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
    width: "100%",
};

const inputLabelStyle = {
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
};

const requiredSpanStyle = {
    color: "red",
    marginLeft: "4px",
};

const inputBaseStyle = {
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#f9fafb",
};

const inputFocusStyle = {
    border: "1px solid #007bff",
};

const inputInvalidStyle = {
    border: "1px solid #dc3545",
    backgroundColor: "#fff5f5",
};

const textareaExtraStyle = {
    minHeight: "120px",
    resize: "vertical",
    fontFamily: "inherit",
};

const errorTextStyle = {
    color: "#dc3545",
    fontSize: "12px",
    marginTop: "4px",
};

function Input({
                   label,
                   name,
                   type = "text",
                   placeholder = "",
                   required = false,
                   value,
                   onChange,
                   onFocus,
                   isInvalid = false,
                   errorMessage = "",
                   isTextarea = false,
               }) {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = (e) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const inputStyle = {
        ...inputBaseStyle,
        ...(isTextarea ? textareaExtraStyle : {}),
        ...(isFocused ? inputFocusStyle : {}),
        ...(isInvalid ? inputInvalidStyle : {}),
    };

    const InputElement = isTextarea ? "textarea" : "input";

    return (
        <div style={inputContainerStyle}>
            {label && (
                <label htmlFor={name} style={inputLabelStyle}>
                    {label}
                    {required && <span style={requiredSpanStyle}>*</span>}
                </label>
            )}
            <InputElement
                id={name}
                name={name}
                type={!isTextarea ? type : undefined}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
            />
            {errorMessage && <p style={errorTextStyle}>{errorMessage}</p>}
        </div>
    );
}

export default Input;