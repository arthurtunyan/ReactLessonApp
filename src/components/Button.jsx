import React from "react";

const buttonBaseStyle = {
    padding: "12px 24px",
    backgroundColor: "#0b1a33",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
};

const buttonHoverStyle = {
    transform: "scale(1.08)",
};

const buttonDisabledStyle = {
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
    opacity: 0.6,
    transform: "none",
};

function Button({ children, onClick, type = "button", disabled = false, className = "", style = {} }) {
    const [isHovered, setIsHovered] = React.useState(false);

    const finalStyle = {
        ...buttonBaseStyle,
        ...(isHovered && !disabled ? buttonHoverStyle : {}),
        ...(disabled ? buttonDisabledStyle : {}),
        ...style,
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className}
            style={finalStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </button>
    );
}

export default Button;