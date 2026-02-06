import type { ReactNode, CSSProperties } from "react";
//ReactNode is a TypeScript type that means “anything React is allowed to render.”

import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material";

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void; //the ? just says that it is type optional, may be omitted
    type?:  MuiButtonProps["type"]; //can be a button, submit, or reset
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
};

function Button({
                    children,
                    onClick,
                    type = "button",
                    disabled = false,
                    className = "",
                    style = {},
                }: ButtonProps) {
    return (
        <MuiButton
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className}
            style={style}
            variant="contained"
            sx={{
                px: "24px",
                py: "12px",
                backgroundColor: "#0b1a33",
                color: "white",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 500,
                textTransform: "none",
                transition: "all 0.2s ease",
                "&:hover": {
                    backgroundColor: "#0b1a33",
                    transform: "scale(1.08)",
                },
            }}
        >
            {children}
        </MuiButton>
    );
}

export default Button;